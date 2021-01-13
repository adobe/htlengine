/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-template-curly-in-string */
const moo = require('moo');

function parseDString(str) {
  return JSON.parse(`{"s":${str}}`).s;
}

function parseSString(str) {
  const sb = str.substring(1, str.length - 1)
    .replace(/[^\\]"/g, '\\"')
    .replace('\\\'', '\'');
  return JSON.parse(`{"s":"${sb}"}`).s;
}

const lexer = moo.states({
  main: {
    EXPR_START: { match: /\$\{/, push: 'expr' },
    TEXT_PART: { match: /(?:(?!\${)(?:\\\$|[^]))+/, lineBreaks: true },
  },
  expr: {
    COMMENT: /<!--\/\*.*?\*\/-->/,
    EXPR_END: { match: '}', pop: 1 },
    BOOL_CONSTANT: ['true', 'false'],
    DOT: '.',
    LBRACKET: '(',
    RBRACKET: ')',
    AND_OP: '&&',
    OR_OP: '||',
    NEQ: '!=',
    NOT_OP: '!',
    IN_OP: 'in',
    COMMA: ',',
    ARRAY_START: '[',
    ARRAY_END: ']',
    ASSIGN: '=',
    OPTION_SEP: '@',
    TERNARY_Q_OP: '?',
    TERNARY_BRANCHES_OP: ':',
    LT: '<',
    LEQ: '<=',
    GEQ: '>=',
    GT: '>',
    EQ: '==',
    ID: {
      match: /[a-zA-Z_][a-zA-Z0-9_:]*/,
      type: moo.keywords({
        BOOL_CONSTANT: ['true', 'false'],
      }),
    },
    FLOAT: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/,
    INT: /-?\d+/,
    WS: { match: /\s+/, lineBreaks: true },

    S_STRING: {
      match: /'(?:\\u[a-fA-F0-9]{4}|\\['\\btnfr]|[^'\n\\])*'/,
      value: parseSString,
    },
    D_STRING: {
      match: /"(?:\\u[a-fA-F0-9]{4,6}|\\["\\btnfr]|[^"\n\\])*"/,
      value: parseDString,
    },
  },
});

module.exports = lexer;
