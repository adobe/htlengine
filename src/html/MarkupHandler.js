/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

module.exports = class MarkupHandler {

    onDocumentStart() {
        this._result = '';
    }

    onDocumentEnd() {
    }

    onOpenTagStart(tagName) {
        this._result += '<' + tagName;
    }

    onAttribute(name, value, quoteChar) {
        if (value !== null) {
            this._result += ` ${name}=${quoteChar}${value}${quoteChar}`;
        } else {
            this._result += ' ' + name;
        }
    }

    onOpenTagEnd(isEmpty) {
        if (isEmpty) {
            this._result += '/';
        }
        this._result += '>';
    }

    onCloseTag(tagName) {
        this._result += `</${tagName}>`;
    }

    onText(text) {
        this._result += text;
    }

    onComment(markup) {
        this._result += markup;
    }

    onDocType(markup) {
        this._result += markup; // todo: check why WS is missing
    }

    get result() {
        return this._result;
    }
};
