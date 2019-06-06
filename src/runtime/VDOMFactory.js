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
const DOMFactory = require('./DOMFactory');

module.exports = class VDOMFactory extends DOMFactory {
  /**
   * Create a new DOM factory.
   * @param {DOMImplementation} domImplementation
   */
  constructor(domImplementation) {
    super();
    this._doc = domImplementation.createHTMLDocument();
    this._isFragment = true;
    this._root = this._doc.createDocumentFragment();
    this._usedNodes = [];
  }

  start() {
    return this._root;
  }

  end() {
    if (this._isFragment) {
      this._doc.body.appendChild(this._root);
      return this._doc.body;
    }
    return this._doc;
  }

  doctype(node, name) {
    if (name !== 'html') {
      this._doc.doctype.name = name;
    }
    this._isFragment = false;
    this._root = this._doc.documentElement;
    return this._root;
  }

  create(tagName) {
    const tag = tagName.toLowerCase();
    if (tag === 'html') {
      this._isFragment = false;
      return this._doc.documentElement;
    }
    if (tag === 'head') {
      this._isFragment = false;
      return this._doc.head;
    }
    if (tag === 'body') {
      this._isFragment = false;
      return this._doc.body;
    }
    return this._doc.createElement(tagName);
  }

  append(node, value) {
    if (typeof value === 'object' && value.cloneNode) {
      if (value.nodeName === 'BODY') {
        // we do not clone the body, as it will not be reused in the document again
        // if this is not desired, the calling application can clone the document first.
        if (node.nodeName === 'HTML') {
          // case: <html>${resource.document.body}</html>
          node.removeChild(this._doc.body);
          node.appendChild(value);
          return;
        }
        // case <html><body>${resource.document.body}</body></html>
        // or <div>${resource.document.body}</div>
        while (value.firstChild) {
          node.appendChild(value.firstChild);
        }
        return;
      }

      if (this._usedNodes.includes(value)) {
        // eslint-disable-next-line no-param-reassign
        value = value.cloneNode(true);
      } else {
        this._usedNodes.push(value);
      }
      node.appendChild(value);
      return;
    }

    // node list
    if (typeof value === 'object' && value.forEach) {
      while (value.length > 0) {
        let child = value[0];
        if (this._usedNodes.includes(child)) {
          child = child.cloneNode(true);
        } else {
          this._usedNodes.push(child);
        }
        node.appendChild(child);
      }
      return;
    }

    const template = this._doc.createElement('template');
    template.innerHTML = String(value);
    node.appendChild(template.content);
  }

  text(node, text) {
    // ignore text in document node
    if (node.nodeName === '#document') {
      return;
    }
    node.appendChild(this._doc.createTextNode(text));
  }

  rem(node, text) {
    node.appendChild(this._doc.createComment(text));
  }

  attr(node, name, value) {
    node.setAttribute(name, value);
  }

  push(parent, node) {
    if (node.nodeName === 'HTML') {
      return node;
    }
    return parent.appendChild(node);
  }

  pop(node) {
    return node.parentNode;
  }
};
