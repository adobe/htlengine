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

// eslint-disable-next-line max-classes-per-file
const START = 0;
const TAG = START + 1;
const NAME = TAG + 1;
const INSIDE = NAME + 1;
const ATTNAME = INSIDE + 1;
const EQUAL = ATTNAME + 1;
const ATTVALUE = EQUAL + 1;
const STRING = ATTVALUE + 1;
const ENDSLASH = STRING + 1;
const END = ENDSLASH + 1;
const BETWEEN_ATTNAME = END + 1;

function isWhitespace(c) {
  return c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\v' || c === '\f' || c === '\u00A0' || c === '\u2028' || c === '\u2029';
}

/**
 * Internal Value class
 */
class Attribute {
  /**
   * Create a new <code>Value</code> instance
   */
  constructor(name, value, quoteChar, line, column) {
    this.name = name;
    this.value = value;
    this.quoteChar = quoteChar;
    this.line = line;
    this.column = column;
  }
}

/**
 * Tokenizes a snippet of characters into a structured tag/attribute name list.
 */
module.exports = class TagTokenizer {
  constructor() {
    this.tagName = '';
    this.attributes = [];
    this.attName = '';
    this.attValue = null;
    this.quoteChar = '';
    this.endTag = false;
    this.endSlash = false;
    this.line = 0;
    this.column = 0;
  }

  /**
     * Scan characters passed to this parser
     */
  tokenize(buf, off, len, line, column) {
    this._reset(line, column);

    let parseState = START;
    for (let i = 0; i < len; i += 1) {
      const c = buf[off + i];
      switch (parseState) {
        case START:
          if (c === '<') {
            parseState = TAG;
          }
          break;
        case TAG:
          if (c === '/') {
            this.endTag = true;
            parseState = NAME;
          } else if (c === '"' || c === '\'') {
            this.quoteChar = c;
            parseState = STRING;
          } else if (isWhitespace(c)) {
            parseState = INSIDE;
          } else {
            this.tagName += c;
            parseState = NAME;
          }
          break;
        case NAME:
          if (isWhitespace(c)) {
            parseState = INSIDE;
          } else if (c === '"' || c === '\'') {
            this.quoteChar = c;
            parseState = STRING;
          } else if (c === '>') {
            parseState = END;
          } else if (c === '/') {
            parseState = ENDSLASH;
          } else {
            this.tagName += c;
          }
          break;
        case INSIDE:
          if (c === '>') {
            this._attributeEnded();
            parseState = END;
          } else if (c === '/') {
            this._attributeEnded();
            parseState = ENDSLASH;
          } else if (c === '"' || c === '\'') {
            this._attributeValueStarted();
            this.quoteChar = c;
            parseState = STRING;
          } else if (c === '=') {
            parseState = EQUAL;
          } else if (!isWhitespace(c)) {
            this.attName += c;
            parseState = ATTNAME;
          }
          break;
        case ATTNAME:
          if (c === '>') {
            this._attributeEnded();
            parseState = END;
          } else if (c === '/') {
            this._attributeEnded();
            parseState = ENDSLASH;
          } else if (c === '=') {
            parseState = EQUAL;
          } else if (c === '"' || c === '\'') {
            this.quoteChar = c;
            parseState = STRING;
          } else if (isWhitespace(c)) {
            parseState = BETWEEN_ATTNAME;
          } else {
            this.attName += c;
          }
          break;
        case BETWEEN_ATTNAME:
          if (c === '>') {
            this._attributeEnded();
            parseState = END;
          } else if (c === '/') {
            this._attributeEnded();
            parseState = ENDSLASH;
          } else if (c === '"' || c === '\'') {
            this._attributeValueStarted();
            this.quoteChar = c;
            parseState = STRING;
          } else if (c === '=') {
            parseState = EQUAL;
          } else if (!isWhitespace(c)) {
            this._attributeEnded();
            this.attName += c;
            parseState = ATTNAME;
          }
          break;
        case EQUAL:
          if (c === '>') {
            this._attributeEnded();
            parseState = END;
          } else if (c === '"' || c === '\'') {
            this._attributeValueStarted();
            this.quoteChar = c;
            parseState = STRING;
          } else if (!isWhitespace(c)) {
            this._attributeValueStarted();
            this.attValue += c;
            parseState = ATTVALUE;
          }
          break;
        case ATTVALUE:
          if (isWhitespace(c)) {
            this._attributeEnded();
            parseState = INSIDE;
          } else if (c === '"' || c === '\'') {
            this._attributeEnded();
            this.quoteChar = c;
            parseState = STRING;
          } else if (c === '>') {
            this._attributeEnded();
            parseState = END;
          } else {
            this.attValue += c;
          }
          break;
        case STRING:
          if (c === this.quoteChar) {
            this._attributeEnded();
            parseState = INSIDE;
          } else {
            this.attValue += (c);
          }
          break;
        case ENDSLASH:
          if (c === '>') {
            this.endSlash = true;
            parseState = END;
          } else if (c === '"' || c === '\'') {
            this.quoteChar = c;
            parseState = STRING;
          } else if (c !== '/' && !isWhitespace(c)) {
            this.attName += c;
            parseState = ATTNAME;
          } else {
            parseState = INSIDE;
          }
          break;
        case END:
          break;
        default:
          throw new Error('Unexpected parse state');
      }
      if (c === '\n') {
        this.line += 1;
        this.column = 0;
      } else {
        this.column += 1;
      }
    }
    return this;
  }

  /**
     * Reset the internal state of the tokenizer
     */
  _reset(line, column) {
    this.tagName = '';
    this.attributes = [];
    this.endTag = false;
    this.endSlash = false;
    this.line = line;
    this.column = column;
  }

  /**
     * Invoked when an attribute ends
     */
  _attributeEnded() {
    if (this.attName.length > 0) {
      const attr = new Attribute(
        this.attName,
        this.attValue,
        this.quoteChar,
        this.line,
        this.column,
      );
      this.attributes.push(attr);
      this.attName = '';
      this.quoteChar = '';
    }
    this.attValue = null;
  }

  /**
     * Invoked when an attribute value starts
     */
  _attributeValueStarted() {
    this.attValue = '';
  }
};
