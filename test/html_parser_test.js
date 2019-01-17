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

// built-in modules
const assert = require('assert');
const path = require('path');
// declared dependencies
const fse = require('fs-extra');
// local modules
const MarkupHandler = require('../src/parser/html/MarkupHandler');
const CommandStream = require('../src/parser/commands/CommandStream');
const HTMLParser = require('../src/parser/html/HTMLParser');
const TestHandler = require('./TestHandler');

/**
 * Simple tests that check if the parser can parse html
 */
describe('HTML Parsing', () => {
  const TEST_FILES = ['simple.htm', '400kb.htm', '700kb.htm'];

  TEST_FILES.forEach((filename) => {
    it(`parses ${filename}`, async () => {
      const filePath = path.resolve(__dirname, 'templates', filename);
      const source = await fse.readFile(filePath, 'utf-8');

      const handler = new TestHandler();
      HTMLParser.parse(source, handler);
      assert.equal(handler.result, source);
    });
  });
});

/**
 * Simple tests that check if the parser can process all the expressions
 */
describe('HTML Parsing and Processing', () => {
  const TEST_FILES = ['simple.htm', '400kb.htm', '700kb.htm'];

  TEST_FILES.forEach((filename) => {
    it(`parses and processes ${filename}`, async () => {
      const filePath = path.resolve(__dirname, 'templates', filename);
      const source = await fse.readFile(filePath, 'utf-8');

      const handler = new MarkupHandler(new CommandStream());
      HTMLParser.parse(source, handler);
    }).timeout(30000);
  });
});
