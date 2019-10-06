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
const format = require('./format');
const formatUri = require('./format_uri');
const formatXss = require('./format_xss');
const HtmlDOMFactory = require('./HtmlDOMFactory');
const HDOMFactory = require('./HDOMFactory');
const VDOMFactory = require('./VDOMFactory');

module.exports = class Runtime {
  constructor() {
    this._globals = {};
    this._templates = {};
    this._useDir = '.';
    this._resourceDir = '.';
    this._dom = new HtmlDOMFactory();
  }

  get globals() {
    return this._globals;
  }

  get templates() {
    return this._templates;
  }

  get dom() {
    return this._dom;
  }

  // eslint-disable-next-line class-methods-use-this
  get col() {
    return {
      init: (c) => (typeof c[Symbol.iterator] === 'function' ? Array.from(c) : c),
      len: (c) => (Array.isArray(c) ? c.length : Object.keys(c).length),
      keys: (c) => Object.keys(c),
      get: (c, k) => (Array.isArray(c) ? c[k] : k),
      // eslint-disable-next-line no-nested-ternary
      empty: (c) => (Array.isArray(c) ? c.length === 0 : (typeof c === 'number' ? !`${c}` : !c)),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  run(fn) {
    return co(fn);
  }

  withDomFactory(domFactory) {
    if (typeof domFactory === 'function') {
      this._dom = domFactory(this);
    } else {
      this._dom = domFactory;
    }
    return this;
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
    return mod.use(this._globals);
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

  call(fn, args) {
    if (!fn) {
      throw new Error('Template call that has not been registered.');
    }
    const callable = fn.bind(this, args);
    return co(callable);
  }

  template(name, callback) {
    if (!name) {
      // this is called to retrieve the template map, so that it looks like the template is
      // like a function reference
      return this._templates;
    }

    return name.split('.').reduce((prev, seg, idx, arr) => {
      if (idx === arr.length - 1) {
        // eslint-disable-next-line no-param-reassign
        prev[seg] = callback;
      } else {
        // eslint-disable-next-line no-param-reassign
        prev[seg] = prev[seg] || {};
      }
      return prev[seg];
    }, this._templates);
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

module.exports.VDOMFactory = VDOMFactory;
module.exports.HDOMFactory = HDOMFactory;
module.exports.HtmlDOMFactory = HtmlDOMFactory;
