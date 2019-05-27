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
/* eslint-disable class-methods-use-this */
const unified = require('unified');
const parse = require('rehype-parse');
const DOMFactory = require('./DOMFactory');

module.exports = class HDOMFactory extends DOMFactory {
  start() {
    this._root = { type: 'root', children: [] };
    return this._root;
  }

  end() {
    return this._root;
  }

  doctype(node, name) {
    node.children.push({ type: 'doctype', name });
    return node;
  }

  create(tagName) {
    return {
      type: 'element',
      tagName,
      properties: {},
      children: [],
    };
  }

  append(node, value) {
    if (typeof value === 'object' && value.type) {
      // todo: clone ?
    } else {
      // eslint-disable-next-line no-param-reassign
      value = unified().use(parse, { fragment: true }).parse(String(value));
    }
    node.children.push(value);
  }

  text(node, text) {
    node.children.push({ type: 'text', value: text });
  }

  rem(node, text) {
    node.children.push({ type: 'comment', value: text });
  }

  attr(node, name, value) {
    // eslint-disable-next-line no-param-reassign
    node.properties[name] = value;
  }

  push(parent, node) {
    parent.children.push(node);
    // eslint-disable-next-line no-param-reassign
    node.parent = parent;
    return node;
  }

  pop(node) {
    const ret = node.parent;
    // eslint-disable-next-line no-param-reassign
    delete node.parent;
    return ret;
  }
};
