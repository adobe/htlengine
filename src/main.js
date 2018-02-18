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

const antlr4 = require('antlr4');
const HTMLLexer = require('./generated/HTMLLexer').HTMLLexer;
const HTMLParser = require('./generated/HTMLParser').HTMLParser;
const MarkupHandler = require('./html/MarkupHandler');
const MarkupListener = require('./html/MarkupListener');

const filename = process.argv[2];
const chars = new antlr4.FileStream(filename);
const lexer = new HTMLLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new HTMLParser(tokens);

parser.buildParseTrees = true;

const tree = parser.htmlDocument();

const handler = new MarkupHandler();
const listener = new MarkupListener(handler);
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

console.log(handler.result);
