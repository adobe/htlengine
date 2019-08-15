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

/* eslint-disable no-plusplus */

const he = require('he');
const TagTokenizer = require('./TagTokenizer');

const VOID_ELEMENTS = Object.freeze({
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wb: true,
});

const PARSE_STATE = Object.freeze({
  OUTSIDE: 0,
  TAG: 1,
  SCRIPT: 2,
  COMMENT: 3,
  STRING: 4,
  EXPRESSION_START: 5,
  EXPRESSION: 6,
  DIRECTIVE: 7,
});

function isWhitespace(c) {
  return c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\v' || c === '\f' || c === '\u00A0' || c === '\u2028' || c === '\u2029';
}

module.exports = class HTMLParser {
  constructor(handler) {
    this._handler = handler;
    this._tagTokenizer = new TagTokenizer();
    this._buffer = '';
    this._line = 0;
    this._column = 0;
    this._startPos = { line: 0, column: 0 };
  }

  static parse(source, handler) {
    return new HTMLParser(handler).parse(source);
  }

  parse(source) {
    this._handler.onDocumentStart();
    this._update(source);
    this._flushBuffer();
    this._handler.onDocumentEnd();
    return this;
  }

  _update(source) {
    let start = 0;
    const end = source.length;
    let parseState = PARSE_STATE.OUTSIDE;
    let parseSubState = 0;
    let prevParseState = null;
    let quoteChar = null;

    for (let curr = start; curr < end; curr++) {
      const c = source[curr];

      switch (parseState) {
        case PARSE_STATE.OUTSIDE:
          if (c === '<') {
            if (curr > start) {
              const text = source.substring(start, curr);
              this._handler.onText(text, this._startPos.line, this._startPos.column);
              this._startPos = { line: this._line, column: this._column };
            }
            start = curr;
            parseState = PARSE_STATE.TAG;
            parseSubState = 0;
          } else if (c === '$') {
            parseState = PARSE_STATE.EXPRESSION_START;
          }
          break;
        case PARSE_STATE.TAG:
          switch (parseSubState) {
            case -1:
              if (c === '"' || c === '\'') {
                quoteChar = c;
                prevParseState = parseState;
                parseState = PARSE_STATE.STRING;
                parseSubState = -1;
              } else if (c === '>') {
                parseState = PARSE_STATE.OUTSIDE;
              }
              break;
            case 0:
              if (c === '!') {
                parseState = PARSE_STATE.COMMENT;
                parseSubState = 0;
              } else if (c === '"' || c === '\'') {
                quoteChar = c;
                prevParseState = parseState;
                parseState = PARSE_STATE.STRING;
                parseSubState = -1;
                this._flushBuffer();
              } else if (c === '>') {
                parseState = PARSE_STATE.OUTSIDE;
                this._flushBuffer();
              } else if (!isWhitespace(c)) {
                parseSubState = 1;
              } else {
                parseSubState = -1;
                this._flushBuffer();
              }
              break;
            case 1:
              if (c === '"' || c === '\'') {
                parseSubState = 2;
                quoteChar = c;
                prevParseState = parseState;
                parseState = PARSE_STATE.STRING;
              } else if (c === '>') {
                const text = source.substring(start, curr + 1);
                parseState = this._processTag(text, this._startPos.line, this._startPos.column)
                  ? PARSE_STATE.SCRIPT
                  : PARSE_STATE.OUTSIDE;
                this._startPos = { line: this._line, column: this._column + 1 };
                start = curr + 1;
                parseSubState = 0;
              } else if (isWhitespace(c)) {
                parseSubState = 2;
              }
              break;
            case 2:
              if (c === '"' || c === '\'') {
                quoteChar = c;
                prevParseState = parseState;
                parseState = PARSE_STATE.STRING;
              } else if (c === '>') {
                const text = source.substring(start, curr + 1);
                parseState = this._processTag(text, this._startPos.line, this._startPos.column)
                  ? PARSE_STATE.SCRIPT
                  : PARSE_STATE.OUTSIDE;
                this._startPos = { line: this._line, column: this._column + 1 };
                start = curr + 1;
                parseSubState = 0;
              }
              break;
            default:
              break;
          }
          break;
        case PARSE_STATE.COMMENT:
          switch (parseSubState) {
            case 0:
              if (c === '-') {
                parseSubState++;
              } else if (c === '"' || c === '\'') {
                quoteChar = c;
                prevParseState = PARSE_STATE.TAG;
                parseState = PARSE_STATE.STRING;
                parseSubState = -1;
                this._flushBuffer();
              } else if (c === '>') {
                parseState = PARSE_STATE.OUTSIDE;
                this._flushBuffer();
              } else {
                parseState = PARSE_STATE.DIRECTIVE;
                parseSubState = -1;
                this._flushBuffer();
              }
              break;
            case 1:
              if (c === '-') {
                parseSubState++;
              } else if (c === '"' || c === '\'') {
                quoteChar = c;
                prevParseState = PARSE_STATE.TAG;
                parseState = PARSE_STATE.STRING;
                parseSubState = -1;
                this._flushBuffer();
              } else if (c === '>') {
                parseState = PARSE_STATE.OUTSIDE;
                this._flushBuffer();
              } else {
                parseState = PARSE_STATE.TAG;
                parseSubState = -1;
                this._flushBuffer();
              }
              break;
            case 2:
              if (c === '-') {
                parseSubState++;
              }
              break;
            case 3:
              if (c === '-') {
                parseSubState++;
              } else {
                parseSubState = 2;
              }
              break;
            case 4:
              if (c === '>') {
                parseState = PARSE_STATE.OUTSIDE;
                const text = source.substring(start + 4, curr - 2);
                this._processComment(text, this._startPos.line, this._startPos.column);
                this._startPos = { line: this._line, column: this._column + 1 };
                start = curr + 1;
              } else {
                parseSubState = 2;
              }
              break;
            default:
              break;
          }
          break;

        case PARSE_STATE.SCRIPT:
          switch (parseSubState) {
            case 0:
              if (c === '<') {
                if (curr > start) {
                  const text = source.substring(start, curr);
                  this._handler.onText(text, this._startPos.line, this._startPos.column);
                  this._startPos = { line: this._line, column: this._column };
                }
                start = curr;
                parseSubState++;
              }
              break;
            case 1:
              if (c === '/') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 2:
              if (c === 'S' || c === 's') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 3:
              if (c === 'C' || c === 'c') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 4:
              if (c === 'R' || c === 'r') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 5:
              if (c === 'I' || c === 'i') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 6:
              if (c === 'P' || c === 'p') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 7:
              if (c === 'T' || c === 't') {
                parseSubState++;
              } else {
                parseSubState = 0;
                this._flushBuffer();
              }
              break;
            case 8:
              if (c === '>') {
                this._processTag(source.substring(start, curr + 1));
                start = curr + 1;
                parseState = PARSE_STATE.OUTSIDE;
              }
              break;
            default:
              break;
          }
          break;

        case PARSE_STATE.STRING:
          if (c === quoteChar) {
            parseState = prevParseState;
          }
          break;

        case PARSE_STATE.EXPRESSION_START:
          if (c === '{') {
            parseState = PARSE_STATE.EXPRESSION;
          } else {
            // not a valid expression
            if (c === '<') {
              // reset to process tag correctly
              curr--;
            }
            parseState = PARSE_STATE.OUTSIDE;
          }
          break;
        case PARSE_STATE.EXPRESSION:
          if (c === '}') {
            parseState = PARSE_STATE.OUTSIDE;
          }
          break;
        case PARSE_STATE.DIRECTIVE:
          if (c === '"' || c === '\'') {
            parseSubState = 1;
            quoteChar = c;
            prevParseState = parseState;
            parseState = PARSE_STATE.STRING;
          } else if (c === '>') {
            const text = source.substring(start, curr + 1);
            this._handler.onDocType(text, this._startPos.line, this._startPos.column);
            this._startPos = { line: this._line, column: this._column + 1 };
            parseState = PARSE_STATE.OUTSIDE;
            start = curr + 1;
            parseSubState = 0;
          }
          break;

        default:
          break;
      }
      if (c === '\n') {
        this._line++;
        this._column = 0;
      } else {
        this._column++;
      }
    }
    if (start < end) {
      this._buffer += source.substring(start, end);
    }
  }

  /**
   * Flush internal buffer. This forces the parser to flush the characters
   * still held in its internal buffer, if the parsing state allows.
   */
  _flushBuffer() {
    if (this._buffer.length > 0) {
      this._handler.onText(this._buffer, this._startPos.line, this._startPos.column);
      this._startPos = { line: this._line, column: this._column };
      this._buffer = '';
    }
  }

  /**
   * Process a comment from current and accumulated character data
   */
  _processComment(source, line, column) {
    this._handler.onComment(this._buffer + source, line, column);
    this._buffer = '';
  }

  /**
   * Decompose a tag and feed it to the document handler.
   */
  _processTag(source, line, column) {
    const snippet = this._buffer + source;
    this._buffer = '';
    const tok = this._tagTokenizer.tokenize(snippet, 0, snippet.length, line, column);
    if (!tok.endTag) {
      this._handler.onOpenTagStart(tok.tagName, line, column);
      tok.attributes.forEach((attr) => {
        const decoded = attr.value ? he.decode(attr.value, { isAttributeValue: true }) : attr.value;
        this._handler.onAttribute(attr.name, decoded, attr.quoteChar, attr.line, attr.column);
      });
      this._handler.onOpenTagEnd(tok.endSlash, VOID_ELEMENTS[tok.tagName]);
    } else {
      this._handler.onCloseTag(tok.tagName, VOID_ELEMENTS[tok.tagName]);
    }
    return tok.tagName.toUpperCase() === 'SCRIPT' && !tok.endSlash;
  }
};
