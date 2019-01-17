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
/* eslint-disable no-unused-vars */
module.exports = class TestHandler {
  onDocumentStart() {
    this._result = '';
  }

  // eslint-disable-next-line class-methods-use-this
  onDocumentEnd() {
  }

  onOpenTagStart(tagName) {
    this._result += `<${tagName}`;
  }

  onAttribute(name, value, quoteChar, line, column) {
    if (value !== null) {
      this._result += ` ${name}=${quoteChar}${value}${quoteChar}`;
    } else {
      this._result += ` ${name}`;
    }
  }

  onOpenTagEnd(isEmpty, isVoid) {
    const markup = isEmpty ? '/>' : '>';
    this._result += markup;
  }

  onCloseTag(tagName, isVoid) {
    if (!isVoid) {
      this._result += `</${tagName}>`;
    }
  }

  onText(text, line, column) {
    this._result += text;
  }

  onComment(markup, line, column) {
    this._result += markup;
  }

  onDocType(markup, line, column) {
    this._result += markup;
  }

  get result() {
    return this._result;
  }
};
