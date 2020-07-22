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

/* eslint-disable no-await-in-loop */

const path = require('path');
const crypto = require('crypto');
const fse = require('fs-extra');
const { SourceMapGenerator } = require('source-map');
const TemplateParser = require('../parser/html/TemplateParser');
const ThrowingErrorListener = require('../parser/htl/ThrowingErrorListener');
const JSCodeGenVisitor = require('./JSCodeGenVisitor');
const ExpressionFormatter = require('./ExpressionFormatter');
const FileReference = require('../parser/commands/FileReference');
const VariableBinding = require('../parser/commands/VariableBinding');
const RuntimeCall = require('../parser/htl/nodes/RuntimeCall');
const Identifier = require('../parser/htl/nodes/Identifier');
const FunctionBlock = require('../parser/commands/FunctionBlock');
const TemplateLoader = require('./TemplateLoader.js');
const ScriptResolver = require('./ScriptResolver.js');

const DEFAULT_TEMPLATE = 'JSCodeTemplate.js';
const RUNTIME_TEMPLATE = 'JSRuntimeTemplate.js';

module.exports = class Compiler {
  /**
   * Generates the module import statement.
   *
   * @param {string} baseDir the base directory (usually cwd)
   * @param {string} varName the variable name of the module to be defined.
   * @param {string} moduleId the id of the module
   * @returns {string} the import string.
   */
  static defaultModuleGenerator(baseDir, varName, moduleId) {
    // make path relative to output directory
    if (path.isAbsolute(moduleId)) {
      // eslint-disable-next-line no-param-reassign
      moduleId = `.${path.sep}${path.relative(baseDir, moduleId)}`;
    }
    return `const ${varName} = require(${JSON.stringify(moduleId)});`;
  }

  constructor() {
    this._dir = '.';
    this._outfile = '';
    this._runtimeGlobals = [];
    this._runtimeGlobal = 'global';
    this._includeRuntime = false;
    this._modHTLEngine = '@adobe/htlengine';
    this._codeTemplate = null;
    this._defaultMarkupContext = undefined;
    this._sourceFile = null;
    this._sourceOffset = 0;
    this._moduleImportGenerator = Compiler.defaultModuleGenerator;
    this._templateLoader = TemplateLoader();
    this._scriptResolver = ScriptResolver('.');
  }

  /**
   * @deprecated use {@link #withDirectoty()} instead.
   */
  withOutputDirectory(dir) {
    return this.withDirectory(dir);
  }

  /**
   * Sets the base directory the compiler uses to resolve compile time paths.
   * @param {string} dir the directory
   * @returns {Compiler} this.
   */
  withDirectory(dir) {
    this._dir = dir;
    this._scriptResolver = ScriptResolver(dir);
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
   * Sets the name of the source file used when generating the source map.
   * @param {string} value the source file name.
   * @returns {Compiler} this
   */
  withSourceFile(value) {
    this._sourceFile = value;
    return this;
  }

  /**
   * Sets the offset of the code in the source file when generating the source map.
   * @param {number} value the offset.
   * @returns {Compiler} this
   */
  withSourceOffset(value) {
    this._sourceOffset = value;
    return this;
  }

  /**
   * Sets the function that generates the module import string.
   * @param {function} fn the function taking the baseDir, variable name and file name.
   */
  withModuleImportGenerator(fn) {
    this._moduleImportGenerator = fn;
    return this;
  }

  /**
   * Sets the function that loads the templates.
   * @param {function} fn the async function taking the file path.
   */
  withTemplateLoader(fn) {
    this._templateLoader = fn;
    return this;
  }

  /**
   * Sets the function that resolves a script.
   * @param {function} fn the async function taking the baseDir and file name.
   */
  withScriptResolver(fn) {
    this._scriptResolver = fn;
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
   * Compiles the given HTL source code into a JavaScript function.
   *
   * @async
   * @param {String} source HTL template code
   * @param {String} baseDir the base directory to resolve file references
   * @param {NodeRequire} localRequire Require function that will be used to load modules.
   * @returns {Promise<Function>} the resulting function
   */
  async compileToFunction(source, baseDir, localRequire = require) {
    const js = await this.compileToString(source, baseDir);
    // eslint-disable-next-line no-new-func
    const template = new Function('exports', 'require', 'module', '__filename', '__dirname', js);
    const mod = {
      id: '.',
      exports: {},
      filename: 'internal',
      children: [],
      parent: null,
      dirname: baseDir,
      require: localRequire,
    };
    template.call(null, mod.exports, mod.require, mod, mod.filename, mod.dirname);
    return mod.exports;
  }

  /**
   * Parses the source and returns the command stream. It resolves any static linked templates
   * recursively.
   *
   * @param {String} source the HTL template code
   * @param {String} baseDir the base directory to resolve file references
   * @param {object} mods object with module mappings from use classes
   * @param {object} templates Object with resolved templates
   * @returns {object} The result object with a `commands` stream and `templates`.
   */
  async _parse(source, baseDir, mods, templates = {}) {
    const commands = new TemplateParser()
      .withErrorListener(ThrowingErrorListener.INSTANCE)
      .withDefaultMarkupContext(this._defaultMarkupContext)
      .parse(source);

    // find any templates references and use classes and process them
    for (let i = 0; i < commands.length; i += 1) {
      const c = commands[i];
      if (c instanceof FileReference) {
        if (c.isTemplate()) {
          const templatePath = await this._scriptResolver(baseDir, c.filename);
          let template = templates[templatePath];
          if (!template) {
            // hash the template path for a somewhat stable id
            const id = crypto.createHash('md5').update(templatePath, 'utf-8').digest().toString('hex');

            // load template
            const {
              data: templateSource,
            } = await this._templateLoader(templatePath);

            // register template
            template = {
              id,
              file: templatePath,
              commands: [],
            };
            // eslint-disable-next-line no-param-reassign
            templates[templatePath] = template;

            // parse the template
            const res = await this._parse(
              templateSource, path.dirname(templatePath), mods, templates,
            );

            // extract the template functions and discard commands outside the functions
            let inside = false;
            res.commands.forEach((cmd) => {
              if (cmd instanceof FunctionBlock.Start) {
                inside = true;
                // eslint-disable-next-line no-param-reassign
                cmd.id = template.id;
              } else if (cmd instanceof FunctionBlock.End) {
                inside = false;
              } else if (!inside) {
                return;
              }
              template.commands.push(cmd);
            });
          }
          // remember the file id on the use statement
          c.id = template.id;
        } else {
          let file = c.filename;
          if (file.startsWith('./') || file.startsWith('../')) {
            file = path.resolve(baseDir, file);
          }
          let name = mods[file];
          if (!name) {
            name = `$$use_${Object.keys(mods).length}`;
            // eslint-disable-next-line no-param-reassign
            mods[file] = name;
          }
          // replace command with runtime call
          commands[i] = new VariableBinding.Global(c.name, new RuntimeCall('use', new Identifier(name), c.args));
        }
      }
    }
    return {
      templates,
      commands,
    };
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
  async compile(source, baseDir = this._dir) {
    const mods = {};
    const parseResult = await this._parse(source, baseDir, mods);

    const global = [];
    if (this._runtimeGlobal) {
      global.push(`  const ${this._runtimeGlobal} = runtime.globals;\n`);
    }
    this._runtimeGlobals.forEach((g) => {
      global.push(`  let ${ExpressionFormatter.escapeVariable(g)} = runtime.globals[${JSON.stringify(g)}];\n`);
    });

    const {
      code, templateCode, mappings, templateMappings, globalTemplateNames,
    } = new JSCodeGenVisitor()
      .withIndent('  ')
      .withSourceMap(this._sourceMap)
      .withSourceOffset(this._sourceOffset)
      .withSourceFile(this._sourceFile)
      .indent()
      .process(parseResult);

    // add modules
    let imports = templateCode;
    Object.entries(mods).forEach(([file, name], idx) => {
      if (idx === 0 && imports) {
        imports += '\n';
      }
      let exp = this._moduleImportGenerator(this._dir, name, file);
      if (!exp) {
        exp = Compiler.defaultModuleGenerator(this._dir, name, file);
      }
      imports += `  ${exp}\n`;
    });
    // add global template names
    globalTemplateNames.forEach((ident) => {
      if (this._runtimeGlobals.indexOf(ident) >= 0) {
        imports += `  ${ident} = $.template('global').${ident};\n`;
      } else {
        imports += `  let ${ident} = $.template('global').${ident};\n`;
      }
    });

    let template = this._codeTemplate;
    if (!template) {
      const codeTemplate = this._includeRuntime ? RUNTIME_TEMPLATE : DEFAULT_TEMPLATE;
      template = await fse.readFile(path.join(__dirname, codeTemplate), 'utf-8');
    }

    if (this._includeRuntime) {
      const engine = JSON.stringify(this._modHTLEngine).slice(1, -1);
      template = template.replace(/MOD_HTLENGINE/, engine);
    }

    template = template.replace(/^\s*\/\/\s*RUNTIME_GLOBALS\s*$/m, `\n${global.join('')}`);

    let index = template.search(/^\s*\/\/\s*TEMPLATES\s*$/m);
    const templatesOffset = index !== -1 ? template.substring(0, index).match(/\n/g).length + 1 : 0;
    template = template.replace(/^\s*\/\/\s*TEMPLATES\s*$/m, `\n${imports}`);

    index = template.search(/^\s*\/\/\s*CODE\s*$/m);
    const codeOffset = index !== -1 ? template.substring(0, index).match(/\n/g).length : 0;
    template = template.replace(/^\s*\/\/\s*CODE\s*$/m, code);

    let sourceMap = null;
    if (mappings) {
      const generator = new SourceMapGenerator({
        sourceRoot: baseDir,
      });
      mappings.forEach((mapping) => {
        // eslint-disable-next-line no-param-reassign
        mapping.generated.line += codeOffset;
        generator.addMapping(mapping);
      });
      templateMappings.forEach((mapping) => {
        // eslint-disable-next-line no-param-reassign
        mapping.generated.line += templatesOffset;
        generator.addMapping(mapping);
      });
      sourceMap = generator.toJSON();
      // relativize source files
      sourceMap.sources = sourceMap.sources.map((file) => path.relative(baseDir, file));
    }
    return { template, sourceMap };
  }
};
