/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const DOMFactory = require('./DOMFactory');

module.exports = class HtmlDOMFactory extends DOMFactory {
  constructor() {
    super();
    this._stack = [];
    this._buf = '';
  }

  _out(text) {
    this._buf += text;
  }

  end() {
    return this._buf;
  }

  doctype(node, name) {
    this._out(`<!DOCTYPE ${name}>`);
    return node;
  }

  create(tagName, isEmpty, isVoid) {
    this._out(`<${tagName}`);
    return {
      tagName,
      isEmpty,
      isVoid,
    };
  }

  append(node, value) {
    this._out(value);
  }

  text(node, text) {
    this._out(text);
  }

  rem(node, text) {
    this._out(`<!--${text}-->`);
  }

  attr(node, name, value) {
    if (value === true) {
      this._out(` ${name}`);
    } else {
      this._out(` ${name}="${value.replace(/"/g, '&quot;')}"`);
    }
  }

  push(parent, node) {
    if (node.isEmpty) {
      this._out('/>');
    } else {
      this._out('>');
    }
    this._stack.push(node);
  }

  pop() {
    const n = this._stack.pop();
    if (!n.isEmpty && !n.isVoid) {
      this._out(`</${n.tagName}>`);
    }
  }
};
