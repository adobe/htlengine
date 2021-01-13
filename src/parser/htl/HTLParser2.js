/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const nearley = require('nearley');
// eslint-disable-next-line import/no-extraneous-dependencies
const inspect = require('unist-util-inspect');
const grammar = require('../generated/grammar.js');

module.exports = class HTLParser2 {
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
     * @param {string} text Input text
     * @return {object} The parsed abstract syntax tree.
     */
  // eslint-disable-next-line class-methods-use-this
  parse(text) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(text);
    const ast = parser.results[0];
    process.stdout.write(inspect(ast));
    return ast;

    // if (this._errorListener) {
    //   parser.addErrorListener(this._errorListener);
    // }
    // return parser.interpolation().interp;
  }
};
