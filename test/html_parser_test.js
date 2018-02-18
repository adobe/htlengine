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

const antlr4 = require('antlr4');
const HTMLLexer = require('../src/generated/HTMLLexer').HTMLLexer;
const HTMLParser = require('../src/generated/HTMLParser').HTMLParser;
const ThrowingErrorListener = require('../src/compiler/ThrowingErrorListener');

const MarkupListener = require('../src/html/MarkupListener');
const MarkupHandler = require('../src/html/MarkupHandler');

function process(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new HTMLLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new HTMLParser(tokens);
    parser.addErrorListener(ThrowingErrorListener.INSTANCE);
    const tree = parser.htmlDocument();

    const handler = new MarkupHandler();
    const listener = new MarkupListener(handler);
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

    console.log(handler.result);
    return handler.result;
}

/**
 * Simple tests that check if the parser can process all the expressions
 */
describe('Simple', function() {
    it('parses the simple html', function() {
        const filename = 'test/simple.html';
        const source = fs.readFileSync(filename, 'utf-8');
        const result = process(source);
        assert.equal(result, source);
    });
});
