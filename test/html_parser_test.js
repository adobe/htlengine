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

/* global describe, it */

const assert = require('assert');
const fs = require('fs');

const MarkupHandler = require('../src/parser/html/MarkupHandler');
const CommandStream = require('../src/parser/commands/CommandStream');

const HTMLParser = require('../src/parser/html/HTMLParser');

function process(input) {
  const handler = new MarkupHandler(new CommandStream());
  HTMLParser.parse(input, handler);
  // eslint-disable-next-line no-console
  console.log(handler.result);
  return handler.result;
}

/**
 * Simple tests that check if the parser can process all the expressions
 */
describe('Simple', () => {
  it('parses the simple html', () => {
    const filename = 'test/simple.html';
    const source = fs.readFileSync(filename, 'utf-8');
    const result = process(source);
    assert.equal(result, source);
  });
});
