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

const antlr4 = require('antlr4');
const { SightlyLexer } = require('../generated/SightlyLexer');
const { SightlyParser } = require('../generated/SightlyParser');

module.exports = class HTLParser {
  /**
     * @param {antlr4.error.ErrorListener} listener Error listener
     * @returns {module.HTLParser} This parser.
     */
  withErrorListener(listener) {
    this._errorListener = listener;
    return this;
  }

  /**
     * Parses the input and returns an Interpolation.
     * @param {String} text Input text
     * @return {Interpolation} The parsed interpolation.
     */
  parse(text) {
    const input = text || '';
    const chars = new antlr4.InputStream(input);
    const lexer = new SightlyLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new SightlyParser(tokens);

    if (this._errorListener) {
      parser.addErrorListener(this._errorListener);
    }
    return parser.interpolation().interp;
  }
};
