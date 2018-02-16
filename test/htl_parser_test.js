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
const assert = require('assert');

const antlr4 = require('antlr4');
const SightlyLexer = require('../src/generated/SightlyLexer').SightlyLexer;
const SightlyParser = require('../src/generated/SightlyParser').SightlyParser;

const DebugVistor = require('../src/compiler/DebugVisitor');

class TestErrorListener extends antlr4.error.ErrorListener {

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        throw new Error('Error: ' + msg);
    };

}

function process(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new SightlyLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new SightlyParser(tokens);
    parser.addErrorListener(new TestErrorListener());
    const tree = parser.expression();

    const visitor = new DebugVistor();
    visitor.visit(tree.expr);

    return visitor.result;
    // return tree.getText();
}

const TESTS = {
    'Expressions': [
        {s: '${myVar}'},
        {s: '${myObject.key}', r: '${myObject[\'key\']}'},
        {s: '${myObject[\'key\']}'},
        {s: '${myObject[keyVar]}'},
        {s: '${myArray[1]}'},
        {s: '${myArray[indexVar]}'},
        {s: '${true}'},
        {s: '${42}'},
        {s: '${\'string\'}'},
        {s: '${"string"}', r: '${\'string\'}'},
        {s: '${[1, 2, 3, true, \'string\']}'},
    ],
    'Logic Operators': [
        {s: '${varOne && !(varTwo || varThree)}', r: '${varOne&&!(varTwo||varThree)}'},
        {s: '${!myVar}'},
        {s: '${varOne && varTwo}', r: '${varOne&&varTwo}'},
        {s: '${varOne || varTwo}', r: '${varOne||varTwo}'},
        {s: '${varChoice ? varOne : varTwo}'}
    ],
    'Comparison': [
        {s: '${nullValueOne == nullValueTwo}', r: '${nullValueOne==nullValueTwo}'},
        {s: '${nullValueOne != nullValueTwo}', r: '${nullValueOne!=nullValueTwo}'},
        {s: '${stringValueOne == stringValueTwo}', r: '${stringValueOne==stringValueTwo}'},
        {s: '${stringValueOne != stringValueTwo}', r: '${stringValueOne!=stringValueTwo}'},
        {s: '${numberValueOne < numberValueTwo}', r: '${numberValueOne<numberValueTwo}'},
        {s: '${numberValueOne <= numberValueTwo}', r: '${numberValueOne<=numberValueTwo}'},
        {s: '${numberValueOne == numberValueTwo}', r: '${numberValueOne==numberValueTwo}'},
        {s: '${numberValueOne >= numberValueTwo}', r: '${numberValueOne>=numberValueTwo}'},
        {s: '${numberValueOne > numberValueTwo}', r: '${numberValueOne>numberValueTwo}'},
        {s: '${numberValueOne != numberValueTwo}', r: '${numberValueOne!=numberValueTwo}'},
        {s: '${booleanValueOne == booleanValueTwo}', r: '${booleanValueOne==booleanValueTwo}'},
        {s: '${booleanValueOne != booleanValueTwo}', r: '${booleanValueOne!=booleanValueTwo}'},
        {s: '${enumConstant == \'CONSTANT_NAME\'}', r: '${enumConstant==\'CONSTANT_NAME\'}'},
    ],
    'Options': [
        {s: '${myVar @ optName}'},
        {s: '${myVar @ optName=myVar}'},
        {s: '${myVar @ optName=true}'},
        {s: '${myVar @ optName=42}'},
        {s: '${myVar @ optName=\'string\'}'},
        {s: '${myVar @ optName="string"}', r: '${myVar @ optName=\'string\'}'},
        {s: '${myVar @ optName=[myVar, \'string\']}'},
        {s: '${myVar @ optName=(varOne && varTwo) || !varThree}', r: '${myVar @ optName=(varOne&&varTwo)||!varThree}'},
        {s: '${myVar @ optOne, optTwo=myVar, optThree=\'string\', optFour=[myVar, \'string\']}'}
    ]
};

/**
 * Simple tests that check if the parser can process all the expressions
 */
Object.keys(TESTS).forEach(function(name) {
    const test = TESTS[name];
    describe(name, function() {
        test.forEach(function(test) {
            it('evaluates the expression correctly', function () {
                const source = test.s;
                const expected = test.r || test.s;
                const result = process(source);
                assert.equal(result, expected);
            });
        });
    });
});