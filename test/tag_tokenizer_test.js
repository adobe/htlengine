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

/* global describe, it */

const assert = require('assert');
const TagTokenizer = require('../src/parser/html/TagTokenizer');

function process(str) {
  return new TagTokenizer().tokenize(str, 0, str.length);
}

const TESTS = [
  {
    markup: '<div>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [],
  }, {
    markup: '<div  >',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [],
  }, {
    markup: '<div/>',
    tagName: 'div',
    endTag: false,
    endSlash: true,
    attrs: [],
  }, {
    markup: '<div   />',
    tagName: 'div',
    endTag: false,
    endSlash: true,
    attrs: [],
  }, {
    markup: '</div>',
    tagName: 'div',
    endTag: true,
    endSlash: false,
    attrs: [],
  }, {
    markup: '<div border>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: null, quoteChar: '' }],
  }, {
    markup: '<div border  >',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: null, quoteChar: '' }],
  }, {
    markup: '<div border  />',
    tagName: 'div',
    endTag: false,
    endSlash: true,
    attrs: [{ name: 'border', value: null, quoteChar: '' }],
  }, {
    markup: '<div border=true>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '' }],
  }, {
    markup: '<div border =true>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '' }],
  }, {
    markup: '<div border= true>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '' }],
  }, {
    markup: '<div border = true>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '' }],
  }, {
    markup: '<div border=\'true\'>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '\'' }],
  }, {
    markup: '<div border=\'tr"ue\'>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'tr"ue', quoteChar: '\'' }],
  }, {
    markup: '<div border= \'true\'>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '\'' }],
  }, {
    markup: '<div border= \'true\' >',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '\'' }],
  }, {
    markup: '<div border= \'true\'/>',
    tagName: 'div',
    endTag: false,
    endSlash: true,
    attrs: [{ name: 'border', value: 'true', quoteChar: '\'' }],
  }, {
    markup: '<div border="true">',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '"' }],
  }, {
    markup: '<div border="tr\'ue">',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'tr\'ue', quoteChar: '"' }],
  }, {
    markup: '<div border= "true">',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '"' }],
  }, {
    markup: '<div border= "true" >',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'border', value: 'true', quoteChar: '"' }],
  }, {
    markup: '<div border= "true"/>',
    tagName: 'div',
    endTag: false,
    endSlash: true,
    attrs: [{ name: 'border', value: 'true', quoteChar: '"' }],
  }, {
    markup: '<div one two>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [
      { name: 'one', value: null, quoteChar: '' },
      { name: 'two', value: null, quoteChar: '' },
    ],
  }, {
    markup: '<div one=true two>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [
      { name: 'one', value: 'true', quoteChar: '' },
      { name: 'two', value: null, quoteChar: '' },
    ],
  }, {
    markup: '<div one=\'true\' two>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [
      { name: 'one', value: 'true', quoteChar: '\'' },
      { name: 'two', value: null, quoteChar: '' },
    ],
  }, {
    markup: '<div one="true" two>',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [
      { name: 'one', value: 'true', quoteChar: '"' },
      { name: 'two', value: null, quoteChar: '' },
    ],
  }, {
    markup: '<div unicode="Boo \uD83D\uDC7B ">',
    tagName: 'div',
    endTag: false,
    endSlash: false,
    attrs: [{ name: 'unicode', value: 'Boo \uD83D\uDC7B ', quoteChar: '"' }],
  },
];

describe('Tag Tokenizer Tests', () => {
  TESTS.forEach((test) => {
    it(`parses ${test.markup}`, () => {
      const tok = process(test.markup);
      assert.equal(tok.endTag, test.endTag, 'is End Tag');
      assert.equal(tok.endSlash, test.endSlash, 'has end Slash');
      assert.equal(tok.tagName, test.tagName, 'Tag Name');
      assert.equal(tok.attributes.length, test.attrs.length, 'Attributes length');
      test.attrs.forEach((expected, idx) => {
        const actual = tok.attributes[idx];
        assert.equal(actual.name, expected.name, `${idx}. Attribute Name`);
        assert.equal(actual.value, expected.value, `${idx}. Attribute Value`);
        assert.equal(actual.quoteChar, expected.quoteChar, `${idx}. Attribute Quote Char`);
      });
    });
  });
});
