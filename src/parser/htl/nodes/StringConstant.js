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
    let sb = '';
    const end = str.length - 2;
    for (let i = 1; i <= end; i += 1) {
      let ch = str[i];
      if (ch === '\\') {
        const nextChar = i === end ? '\\' : str[i + 1];

        // Octal escape?
        if (nextChar >= '0' && nextChar <= '7') {
          let code = `${nextChar}`;
          i += 1;
          if (i < end && str[i + 1] >= '0' && str[i + 1] <= '7') {
            code += str[i + 1];
            i += 1;
            if (i < end && str[i + 1] >= '0' && str[i + 1] <= '7') {
              code += str[i + 1];
              i += 1;
            }
          }
          sb.append(Number.parseInt(code, 8));
        } else {
          switch (nextChar) {
            case '\\':
              ch = '\\';
              break;
            case 'b':
              ch = '\b';
              break;
            case 'f':
              ch = '\f';
              break;
            case 'n':
              ch = '\n';
              break;
            case 'r':
              ch = '\r';
              break;
            case 't':
              ch = '\t';
              break;
            case '"':
              ch = '"';
              break;
            case '\'':
              ch = '\'';
              break;
            // Hex Unicode: u????
            case 'u':
              if (i >= str.length - 6) {
                ch = 'u';
                break;
              }
              sb += String.fromCharCode(Number.parseInt(str.substr(i, 4), 16));
              i += 4;
              break;
            default:
              // nop
          }
          i += 1;
        }
      }
      sb += ch;
    }
    return new StringConstant(sb);
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
