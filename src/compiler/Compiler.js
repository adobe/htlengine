/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');
const { SourceMapGenerator } = require('source-map');
// local modules
const TemplateParser = require('../parser/html/TemplateParser');
const ThrowingErrorListener = require('../parser/htl/ThrowingErrorListener');
const JSCodeGenVisitor = require('./JSCodeGenVisitor');
const ExpressionFormatter = require('./ExpressionFormatter');
const TemplateReference = require('../parser/commands/TemplateReference');
const FunctionBlock = require('../parser/commands/FunctionBlock');

const DEFAULT_TEMPLATE = 'JSCodeTemplate.js';
const RUNTIME_TEMPLATE = 'JSRuntimeTemplate.js';

module.exports = class Compiler {
  constructor() {
    this._dir = '.';
    this._outfile = '';
    this._runtimeGlobals = [];
    this._runtimeGlobal = 'global';
    this._includeRuntime = false;
    this._modHTLEngine = '@adobe/htlengine';
    this._codeTemplate = null;
    this._defaultMarkupContext = undefined;
  }

  withOutputDirectory(dir) {
    this._dir = dir;
    return this;
  }

  withOutputFile(outFile) {
    this._outfile = outFile;
    return this;
  }

  withRuntimeGlobalName(name) {
    this._runtimeGlobal = name;
    return this;
  }

  withRuntimeVar(name) {
    if (Array.isArray(name)) {
      this._runtimeGlobals = this._runtimeGlobals.concat(name);
    } else {
      this._runtimeGlobals.push(name);
    }
    return this;
  }

  withRuntimeHTLEngine(mod) {
    this._modHTLEngine = mod;
    return this;
  }

  includeRuntime(include) {
    this._includeRuntime = include;
    return this;
  }

  withSourceMap(sourceMap) {
    this._sourceMap = sourceMap;
    return this;
  }

  withCodeTemplate(tmpl) {
    this._codeTemplate = tmpl;
    return this;
  }

  /**
   * Sets the default markup context when writing properties to the response.
   * @param {MarkupContext} context the default context
   * @return this
   */
  withDefaultMarkupContext(context) {
    this._defaultMarkupContext = context;
    return this;
  }

  /**
   * Compiles the specified source file and saves the result, overwriting the
   * file name.
   *
   * @async
   * @param {String} filename HTL template source file
   * @param {String} name file name to save results
   * @returns {Promise<String>} the full name of the resulting file
   */
  async compileFile(filename, name) {
    return this.compileToFile(await fse.readFile(filename, 'utf-8'), name || filename, path.dirname(filename));
  }

  /**
   * Compiles the given HTL source code into JavaScript, which is returned as a string
   *
   * @async
   * @param {String} source the HTL source code
   * @param {String} baseDir the base directory to resolve file references
   * @returns {Promise<String>} the resulting Javascript
   */
  async compileToString(source, baseDir) {
    return (await this.compile(source, baseDir)).template;
  }

  /**
   * Compiles the given source string and saves the result, overwriting the
   * file name.
   *
   * @async
   * @param {String} source HTL template code
   * @param {String} name file name to save results
   * @param {String} baseDir the base directory to resolve file references
   * @returns {Promise<String>} the full name of the resulting file
   */
  async compileToFile(source, name, baseDir) {
    const { template, sourceMap } = await this.compile(source, baseDir);

    const filename = this._outfile || path.resolve(this._dir, name);
    await fse.writeFile(filename, template);

    if (sourceMap) {
      await fse.writeFile(`${filename}.map`, JSON.stringify(sourceMap));
    }
    return filename;
  }

  /**
   * Parses the source and returns the command stream. It resolves any static linked templates
   * recursively.
   *
   * @param {String} source the HTL template code
   * @param {String} baseDir the base directory to resolve file references
   * @returns The command stream.
   */
  async _parse(source, baseDir) {
    const commands = new TemplateParser()
      .withErrorListener(ThrowingErrorListener.INSTANCE)
      .withDefaultMarkupContext(this._defaultMarkupContext)
      .parse(source);

    // find any templates and inject them into the stream
    for (let i = 0; i < commands.length; i += 1) {
      const c = commands[i];
      if (c instanceof TemplateReference) {
        // remove from command array
        const templatePath = path.resolve(baseDir, c.filename);
        // eslint-disable-next-line no-await-in-loop
        const template = await fse.readFile(templatePath, 'utf-8');
        // eslint-disable-next-line no-await-in-loop
        const templateCommands = await this._parse(template, path.dirname(templatePath));

        // prefix all templates with the variable name of the use class and discard commands
        // outside functions.
        let inside = false;
        for (let j = 0; j < templateCommands.length; j += 1) {
          const cmd = templateCommands[j];
          if (cmd instanceof FunctionBlock.Start) {
            inside = true;
            // eslint-disable-next-line no-underscore-dangle
            cmd._expression = `${c.name}.${cmd._expression}`;
          } else if (cmd instanceof FunctionBlock.End) {
            inside = false;
          } else if (!inside) {
            // eslint-disable-next-line no-plusplus
            templateCommands.splice(j--, 1);
          }
        }

        // finally merge the template functions into the commands stream
        commands.splice(i, 1, ...templateCommands);
        i += templateCommands.length - 1;
      }
    }
    return commands;
  }

  /**
   * Compiles the given source string and returns the generated JS
   * and sourceMap in an object.
   *
   * @async
   * @param {String} source HTL template code
   * @param {String} [baseDir] the base directory to resolve dependencies.
   *                           defaults to the output directory.
   * @returns {Promise<Object>} An object consisting of a generated template and a source map
   */
  async compile(source, baseDir) {
    const commands = await this._parse(source, baseDir || this._dir);

    const global = [];
    this._runtimeGlobals.forEach((g) => {
      global.push(`    let ${ExpressionFormatter.escapeVariable(g)} = runtime.globals[${JSON.stringify(g)}];\n`);
    });
    if (this._runtimeGlobal) {
      global.push(`    const ${this._runtimeGlobal} = runtime.globals;\n`);
    }

    const { code, templates, mappings } = new JSCodeGenVisitor()
      .withIndent('  ')
      .withSourceMap(this._sourceMap)
      .indent()
      .process(commands);

    let template = this._codeTemplate;
    if (!template) {
      const codeTemplate = this._includeRuntime ? RUNTIME_TEMPLATE : DEFAULT_TEMPLATE;
      template = await fse.readFile(path.join(__dirname, codeTemplate), 'utf-8');
    }

    if (this._includeRuntime) {
      const engine = JSON.stringify(this._modHTLEngine).slice(1, -1);
      template = template.replace(/MOD_HTLENGINE/, engine);
    }

    let index = template.search(/^\s*\/\/\s*TEMPLATES\s*$/m);
    const templatesOffset = index !== -1 ? template.substring(0, index).match(/\n/g).length + 1 : 0;
    template = template.replace(/^\s*\/\/\s*TEMPLATES\s*$/m, `\n${templates}`);

    template = template.replace(/^\s*\/\/\s*RUNTIME_GLOBALS\s*$/m, `\n${global.join('')}`);

    index = template.search(/^\s*\/\/\s*CODE\s*$/m);
    const codeOffset = index !== -1 ? template.substring(0, index).match(/\n/g).length + 1 : 0;
    template = template.replace(/^\s*\/\/\s*CODE\s*$/m, `\n${code}`);

    let sourceMap = null;
    if (mappings) {
      const generator = new SourceMapGenerator();
      mappings.forEach((mapping) => {
        generator.addMapping({
          generated: {
            line: mapping.generatedLine
              + (mapping.inFunctionBlock ? templatesOffset : codeOffset) + 1,
            column: mapping.generatedColumn,
          },
          source: '<internal>',
          original: {
            line: mapping.originalLine + 1,
            column: mapping.originalColumn,
          },
        });
      });
      sourceMap = generator.toJSON();
    }
    return { template, sourceMap };
  }
};
