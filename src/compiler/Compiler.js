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

const fs = require('fs');
const path = require('path');

const TemplateParser = require('../parser/html/TemplateParser');
const ThrowingErrorListener = require('../parser/htl/ThrowingErrorListener');
const JSCodeGenVisitor = require('./JSCodeGenVisitor');

const { SourceMapGenerator } = require('source-map');

const DEFAULT_TEMPLATE = 'JSCodeTemplate.js';
const RUNTIME_TEMPLATE = 'JSRuntimeTemplate.js';

module.exports = class Compiler {
  constructor() {
    this._dir = '.';
    this._outfile = '';
    this._runtimeGlobals = [];
    this._runtimeGlobal = 'resource';
    this._includeRuntime = false;
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

  includeRuntime(include) {
    this._includeRuntime = include;
    return this;
  }

  withSourceMap(sourceMap) {
    this._sourceMap = sourceMap;
    return this;
  }

  compileFile(filename, name) {
    // todo: async support
    return this.compileToFile(fs.readFileSync(filename, 'utf-8'), name || filename);
  }

  /**
   * Compiles the given HTL source code into JavaScript, which is returned as a string
   * @param {String} source the HTL source code
   * @returns {String} the resulting Javascript
   */
  compileToString(source) {
    return this.compile(source).js;
  }

  /**
   * Compiles the given source string and saves the result, overwriting the
   * file name.
   * @param {String} source HTL template code
   * @param {String} name file name to save results
   * @returns {String} the full name of the resulting file
   */
  compileToFile(source, name) {
    const { template, sourceMap } = this.compile(source);

    const filename = this._outfile || path.resolve(this._dir, name);
    fs.writeFileSync(filename, template);

    if (sourceMap) {
      fs.writeFileSync(`${filename}.map`, JSON.stringify(sourceMap));
    }
    return filename;
  }

  /**
   * Compiles the given source string and returns the generated JS
   * and sourceMap in an object.
   *
   * @param {String} source HTL template code
   * @param {String} name file name to save results
   * @returns {Object} an object consisting of a generated template and a source map
   */
  compile(source) {
    // todo: async support
    const commands = new TemplateParser()
      .withErrorListener(ThrowingErrorListener.INSTANCE)
      .parse(source);

    const global = [];
    this._runtimeGlobals.forEach((g) => {
      global.push(`    let ${g} = runtime.globals.${g};\n`);
    });
    if (this._runtimeGlobal) {
      global.push(`    const ${this._runtimeGlobal} = runtime.globals;\n`);
    }

    const { code, templates, mappings } = new JSCodeGenVisitor()
      .withIndent('  ')
      .withSourceMap(this._sourceMap)
      .indent()
      .process(commands);

    const codeTemplate = this._includeRuntime ? RUNTIME_TEMPLATE : DEFAULT_TEMPLATE;
    let template = fs.readFileSync(path.join(__dirname, codeTemplate), 'utf-8');

    let index = template.search(/^\s*\/\/\s*TEMPLATES\s*$/m);
    const templatesOffset = index !== -1 ? template.substring(0, index).split('\n').length : 0;
    template = template.replace(/^\s*\/\/\s*TEMPLATES\s*$/m, `\n${templates}`);

    template = template.replace(/^\s*\/\/\s*RUNTIME_GLOBALS\s*$/m, `\n${global.join('')}`);

    index = template.search(/^\s*\/\/\s*CODE\s*$/m);
    const codeOffset = index !== -1 ? template.substring(0, index).split('\n').length : 0;
    template = template.replace(/^\s*\/\/\s*CODE\s*$/m, `\n${code}`);

    let sourceMap = null;
    if (mappings) {
      const generator = new SourceMapGenerator();
      mappings.forEach((mapping) => {
        generator.addMapping({
          generated: {
            line: mapping.generatedLine +
              (mapping.inFunctionBlock ? templatesOffset : codeOffset) + 1,
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
