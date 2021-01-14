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

/**
 * A sequence with alternating string fragments and HTL expressions. These result from parsing HTML
 * attributes or string nodes.
 * For instance "Hello ${World}!" would result in 3 fragments: "Hello ", ${World} and "!"
 */
module.exports = class Interpolation {
  constructor() {
    this.type = 'interpolation';
    this.children = [];
    this._content = '';
    this._isPlainText = true;
  }

  addExpression(expression) {
    this._isPlainText = false;
    this.children.push(expression);
  }

  addText(text) {
    this.children.push({
      type: 'text',
      value: text,
    });
  }

  get fragments() {
    return this.children;
  }

  get content() {
    return this._content;
  }

  set content(content) {
    this._content = content;
  }

  accept(visitor) {
    return visitor.visit(this);
  }

  getPlainText() {
    if (!this._isPlainText) {
      return null;
    }
    let text = '';
    for (let i = 0; i < this.children.length; i += 1) {
      text += this.children[i].value;
    }
    return text;
  }
};
