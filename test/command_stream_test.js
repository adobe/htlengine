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
const CommandStream = require('../src/commands/CommandStream');
const DebugCommandVisitor = require('../src/commands/DebugCommandVisitor');

function process(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new HTMLLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new HTMLParser(tokens);
    parser.addErrorListener(ThrowingErrorListener.INSTANCE);
    const tree = parser.htmlDocument();

    const stream = new CommandStream();
    const handler = new MarkupHandler(stream);
    const listener = new MarkupListener(handler);
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

    const cmdvisitor = new DebugCommandVisitor();
    stream.commands.forEach((c) => {
        c.accept(cmdvisitor);
    });

    console.log(cmdvisitor.result);
    return cmdvisitor.result;
}

function readTests(filename) {
    const text = fs.readFileSync(filename, 'utf-8');
    const lines = text.split(/\r\n|\r|\n/);

    const tests = [];
    let test = null;
    lines.forEach((line) => {
        if (line === '#') {
            return;
        }
        if (line.startsWith('###')) {
            test = {
                name: line.substring(4),
                input: ''
            };
            tests.push(test);
        } else if (line.startsWith('---')) {
            test.commands = ''
        } else if (test && ('commands' in test)) {
            test.commands += line + '\n';
        } else if (test && ('input' in test)) {
            test.input += line;
        }
    });
    return tests;
}

describe('Command Stream Tests', function() {

    const tests = readTests('test/command_stream_spec.txt');

    describe('simple tests', function(done) {
        tests.forEach(function(test) {
            if (!test.input || !test.commands) {
                return;
            }
            it(`Processes '${test.name}' correctly.`, function() {
                const result = process(test.input);
                assert.equal(result, test.commands);
            });
        });
    });
});
