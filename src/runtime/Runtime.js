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
    this._resourceLoader = null;
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
    function limit(col, { begin, end, step } = {}) {
      if (!begin && !end && !step) {
        return col;
      }
      /* eslint-disable no-param-reassign */
      if (!Array.isArray(col)) {
        col = Object.keys(col);
      }
      begin = begin ? Number.parseInt(begin, 10) : 0;
      end = end ? Number.parseInt(end, 10) : col.length - 1;
      step = step ? Number.parseInt(step, 10) : 1;
      const ret = [];
      for (let i = begin; i <= end; i += step) {
        ret.push(col[i]);
      }
      return ret;
      /* eslint-enable no-param-reassign */
    }

    function rel(key, value) {
      if (typeof value === 'object') {
        return Array.isArray(value) ? value.indexOf(key) >= 0 : (key in value);
      }
      return value.toString().indexOf(key) >= 0;
    }

    return {
      init: (c, opts) => limit(typeof c[Symbol.iterator] === 'function' ? Array.from(c) : c, opts),
      len: (c) => (Array.isArray(c) ? c.length : Object.keys(c).length),
      keys: (c) => Object.keys(c),
      get: (c, k) => (Array.isArray(c) ? c[k] : k),
      // eslint-disable-next-line no-nested-ternary
      empty: (c) => (Array.isArray(c) ? c.length === 0 : (typeof c === 'number' ? !`${c}` : !c)),
      rel,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async run(fn) {
    const gen = fn();
    let ret = {};
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      ret = gen.next(await ret.value);
      if (ret.done) {
        return ret.value;
      }
    }
  }

  withDomFactory(domFactory) {
    if (typeof domFactory === 'function') {
      this._dom = domFactory(this);
    } else {
      this._dom = domFactory;
    }
    return this;
  }

  withResourceLoader(value) {
    this._resourceLoader = value;
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

  async use(Mod, options) {
    const mod = new Mod();
    Object.keys(options).forEach((k) => {
      mod[k] = options[k];
    });
    return new Proxy(await mod.use(this._globals), {
      has(target, key) {
        if (!(key in target)) {
          // eslint-disable-next-line no-param-reassign
          key = `get${key.charAt(0).toUpperCase()}${key.substring(1)}`;
          return key in target;
        }
        return true;
      },

      get(target, prop, receiver) {
        if (prop === 'then') {
          return Reflect.get(target, prop, receiver);
        }
        if (!(prop in target)) {
          if (!prop.startsWith('get')) {
            // eslint-disable-next-line no-param-reassign
            prop = `get${prop.charAt(0).toUpperCase()}${prop.substring(1)}`;
          }
        }
        if (prop in target) {
          let value = target[prop];
          if (typeof value === 'function') {
            value = value();
          }
          return value;
        }
        return undefined;
      },
    });
  }

  resource(uri, options) {
    if (!this._resourceLoader) {
      return '';
    }
    return this._resourceLoader(this, uri, options);
  }

  // eslint-disable-next-line class-methods-use-this
  xss(value, context, hint) {
    return formatXss(value, context, hint);
  }

  async call(fn, args) {
    if (!fn) {
      throw new Error('Template call that has not been registered.');
    }
    const callable = fn.bind(this, args);
    return this.run(callable);
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
      return Array.isArray(value) ? value.join(arg0 || ', ') : value;
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
