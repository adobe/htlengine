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

module.exports = class Runtime {

    constructor() {
        this._stream = '';
        this._globals = {};
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

    setGlobal(name, obj) {
        if (obj === undefined) {
            Object.keys(name).forEach((k) => {
                this._globals[k] = name[k];
            });
        } else {
            this._globals[name] = obj;
        }
    }

    xss(value, options) {
        return format_xss(value, options.context);
    }

    exec(name, value, options) {
        if (name === 'join') {
            return value.join(options.join || ', ');
        }

        if (name === 'format') {
            return format(value, options.format);
        }

        if (name === 'uriManipulation') {
            return format_uri(value, options);
        }

        if (name === 'xss') {
            this.xss(value, options);
        }

        throw new Error('Unknown runtime call: ' + name);
    }

};