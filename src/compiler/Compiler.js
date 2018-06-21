/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const fs = require('fs');
const path = require('path');

const TemplateParser = require('../parser/html/TemplateParser');
const ThrowingErrorListener = require('../parser/htl/ThrowingErrorListener');
const JSCodeGenVisitor = require('./JSCodeGenVisitor');

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

    compileFile(filename, name) {
        // todo: async support
        return this.compile(fs.readFileSync(filename, 'utf-8'), name || filename);
    }

    /**
     * Compiles the given HTL source code into JavaScript, which is returned as a string
     * @param {String} source the HTL source code
     * @returns {String} the resulting Javascript
     */
    compileTransient(source) {
        // todo: async support
        const commands = new TemplateParser()
            .withErrorListener(ThrowingErrorListener.INSTANCE)
            .parse(source);

        const global = [];
        this._runtimeGlobals.forEach(g => {
            global.push(`        let ${g} = runtime.globals.${g};\n`);
        });
        if (this._runtimeGlobal) {
            global.push(`        const ${this._runtimeGlobal} = runtime.globals;\n`);
        }

        const code = new JSCodeGenVisitor()
            .withIndent('    ')
            .indent()
            .process(commands)
            .code;

        const codeTemplate = this._includeRuntime ? RUNTIME_TEMPLATE : DEFAULT_TEMPLATE;
        let template = fs.readFileSync(path.join(__dirname, codeTemplate), 'utf-8');
        template = template.replace(/^\s*\/\/\s*RUNTIME_GLOBALS\s*$/m, global.join(''));
        template = template.replace(/^\s*\/\/\s*CODE\s*$/m, code);

        return template;
    }

    /**
     * Compiles the given source string and saves the result, overwriting the
     * file name.
     * @param {String} source HTL template code
     * @param {String} name file name to save results
     * @returns {String} the full name of the resulting file
     */
    compile(source, name) {
        const template = this.compileTransient(source);

        const filename = this._outfile || path.resolve(this._dir, name);
        fs.writeFileSync(filename, template);

        return filename;
    }
};
