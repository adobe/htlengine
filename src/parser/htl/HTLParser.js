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
const inspect = require('unist-util-inspect');
const grammar = require('../generated/grammar.js');
const Interpolation = require('./nodes/Interpolation');

module.exports = class HTLParser {
  constructor() {
    this.debug = false;
  }

  /**
     * Parses the input and returns an Interpolation.
     * @param {string} text Input text
     * @return {object} The parsed abstract syntax tree.
     */
  // eslint-disable-next-line class-methods-use-this
  parse(text, { line = 0, column = 0 } = {}) {
    // eslint-disable-next-line no-param-reassign
    text = text || ''; // avoid null
    if (this.debug) {
      process.stdout.write(`[${line}:${column}] ${text.substring(0, 40).replace(/\n\r/g, ' ')}\n`);
    }
    let htl = new Interpolation();
    if (text) {
      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
      parser.feed(`${text}\x03`);
      // eslint-disable-next-line prefer-destructuring
      htl = parser.results[0];
    }

    if (this.debug) {
      process.stdout.write(inspect(htl));
      process.stdout.write('\n\n');
    }
    return htl;
  }
};
