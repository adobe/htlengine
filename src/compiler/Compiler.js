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
        this._runtimeGlobals = [];
        this._includeRuntime = false;
    }

    withOutputDirectory(dir) {
        this._dir = dir;
        return this;
    }

    withRuntimeGlobal(global) {
        if (Array.isArray(global)) {
            this._runtimeGlobals = this._runtimeGlobals.concat(global);
        } else {
            this._runtimeGlobals.push(global);
        }
        return this;
    }

    includeRuntime(include) {
        this._includeRuntime = include;
        return this;
    }

    compile(source, name) {
        const commands = new TemplateParser()
            .withErrorListener(ThrowingErrorListener.INSTANCE)
            .parse(source);

        const global = [];
        this._runtimeGlobals.forEach(g => {
            global.push(`        let ${g} = runtime.globals.${g};\n`)
        });

        const code = new JSCodeGenVisitor()
            .withIndent('    ')
            .indent()
            .process(commands)
            .code;

        const codeTemplate = this._includeRuntime ? RUNTIME_TEMPLATE : DEFAULT_TEMPLATE;
        let template = fs.readFileSync(path.join(__dirname, codeTemplate), 'utf-8');
        template = template.replace(/^\s*\/\/\s*RUNTIME_GLOBALS\s*$/m, global.join(''));
        template = template.replace(/^\s*\/\/\s*CODE\s*$/m, code);

        const filename = path.resolve(this._dir, name);
        fs.writeFileSync(filename, template);

        return filename;
    }
};
