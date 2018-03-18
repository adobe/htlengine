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

const format = require('../runtime/format');
const format_uri = require('../runtime/format_uri');
const format_xss = require('../runtime/format_xss');
const path = require('path');
const co = require('co');

module.exports = class Runtime {

    constructor() {
        this._stream = '';
        this._globals = {};
        this._useDir = '.';
    }

    out(text) {
        this._stream += text;
    }

    get stream() {
        return this._stream;
    }

    get globals() {
        return this._globals;
    }

    run(fn) {
        return co(fn);
    }

    withUseDirectory(dir) {
        this._useDir = dir;
        return this;
    }

    setGlobal(name, obj) {
        if (obj === undefined) {
            Object.keys(name).forEach((k) => {
                this._globals[k] = name[k];
            });
        } else {
            this._globals[name] = obj;
        }
        return this;
    }

    listInfo(idx, size) {
        idx = Number(idx);
        size = Number(size);
        const count = idx + 1;
        return {
            'index': idx,
            'count': count,
            'first': idx === 0,
            'middle': idx > 0 && count < size,
            'last': count === size,
            'odd': idx % 2 === 0,
            'even': idx % 2 === 1
        }
    }

    use(uri, options) {
        const Mod = require(path.resolve(this._useDir, uri));
        const mod = new Mod();
        Object.keys(options).forEach(k => {
            mod[k] = options[k];
        });
        return mod.use();
    }

    xss(value, context, hint) {
        return format_xss(value, context, hint);
    }

    exec(name, value, arg0, arg1) {
        if (name === 'join') {
            return value.join(arg0 || ', ');
        }

        if (name === 'format') {
            return format(value, arg0);
        }

        if (name === 'uriManipulation') {
            return format_uri(value, arg0);
        }

        if (name === 'xss') {
            return this.xss(value, arg0, arg1);
        }

        if (name === 'use') {
            return this.use(value, arg0);
        }

        if (name === 'listInfo') {
            return this.listInfo(value, arg0);
        }

        throw new Error('Unknown runtime call: ' + name);
    }

};