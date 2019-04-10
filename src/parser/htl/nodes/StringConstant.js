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

const Atom = require('./Atom');

class StringConstant extends Atom {
  static parse(str) {
    if (str[0] === '\'') {
      const sb = str.substring(1, str.length - 1)
        .replace(/[^\\]"/g, '\\"')
        .replace('\\\'', '\'');
      return new StringConstant(JSON.parse(`{"s":"${sb}"}`).s);
    }
    return new StringConstant(JSON.parse(`{"s":${str}}`).s);
  }

  constructor(text) {
    super();
    this._text = text;
  }

  get text() {
    return this._text;
  }
}

StringConstant.EMPTY = new StringConstant('');
StringConstant.TRUE = new StringConstant('true');
StringConstant.FALSE = new StringConstant('false');

module.exports = StringConstant;
