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

const path = require('path');
const co = require('co');
const fs = require('fs');
const format = require('../runtime/format');
const formatUri = require('../runtime/format_uri');
const formatXss = require('../runtime/format_xss');

module.exports = class Runtime {
  constructor() {
    this._stream = '';
    this._globals = {};
    this._templates = {};
    this._useDir = '.';
    this._resourceDir = '.';
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

  get templates() {
    return this._templates;
  }

  // eslint-disable-next-line class-methods-use-this
  run(fn) {
    return co(fn);
  }

  withUseDirectory(dir) {
    this._useDir = dir;
    return this;
  }

  withResourceDirectory(dir) {
    this._resourceDir = dir;
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

  // eslint-disable-next-line class-methods-use-this
  listInfo(idx, size) {
    const nIdx = Number(idx);
    const nSize = Number(size);
    const count = nIdx + 1;
    return {
      index: nIdx,
      count,
      first: nIdx === 0,
      middle: nIdx > 0 && count < nSize,
      last: count === nSize,
      odd: nIdx % 2 === 0,
      even: nIdx % 2 === 1,
    };
  }

  use(uri, options) {
    // todo: use more save module loading
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const Mod = require(path.resolve(this._useDir, uri));
    const mod = new Mod();
    Object.keys(options).forEach((k) => {
      mod[k] = options[k];
    });
    return mod.use();
  }

  resource(uri) {
    const resourcePath = path.resolve(this._resourceDir, uri);

    return new Promise((resolve, reject) => {
      fs.readFile(resourcePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  xss(value, context, hint) {
    return formatXss(value, context, hint);
  }

  call(name, args) {
    // eslint-disable-next-line no-prototype-builtins
    if (this._templates.hasOwnProperty(name) === false) {
      throw new Error(`Template call that has not been registered: ${name}`);
    } else {
      const callable = this._templates[name].bind(this, args);
      return co(callable);
    }
  }

  template(name, callback) {
    this._templates[name] = callback;
  }

  exec(name, value, arg0, arg1) {
    if (name === 'join') {
      return value.join(arg0 || ', ');
    }

    if (name === 'format') {
      return format(value, arg0);
    }

    if (name === 'uriManipulation') {
      return formatUri(value, arg0);
    }

    if (name === 'xss') {
      return this.xss(value, arg0, arg1);
    }

    if (name === 'use') {
      return this.use(value, arg0);
    }

    if (name === 'resource') {
      return this.resource(value);
    }

    if (name === 'call') {
      return this.call(value, arg0);
    }

    if (name === 'listInfo') {
      return this.listInfo(value, arg0);
    }

    throw new Error(`Unknown runtime call: ${name}`);
  }
};
