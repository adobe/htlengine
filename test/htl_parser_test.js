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

const DebugVisitor = require('../src/parser/htl/DebugVisitor');
const HTLParser = require('../src/parser/htl/HTLParser');
const ThrowingErrorListener = require('../src/parser/htl/ThrowingErrorListener');

function process(input) {
  const interp = new HTLParser()
    .withErrorListener(ThrowingErrorListener.INSTANCE)
    .parse(input);

  const visitor = new DebugVisitor();
  visitor.visit(interp);

  return visitor.result;
}

/* eslint-disable no-template-curly-in-string */

const TESTS = {
  Expressions: [
    { s: '${myVar}' },
    { s: '${myObject.key}', r: '${myObject[\'key\']}' },
    { s: '${myObject[\'key\']}' },
    { s: '${myObject[keyVar]}' },
    { s: '${myArray[1]}' },
    { s: '${myArray[indexVar]}' },
    { s: '${true}' },
    { s: '${42}' },
    { s: '${\'string\'}' },
    { s: '${"string"}', r: '${\'string\'}' },
    { s: '${[1, 2, 3, true, \'string\']}' },
  ],
  'Logic Operators': [
    { s: '${varOne && !(varTwo || varThree)}', r: '${varOne&&!(varTwo||varThree)}' },
    { s: '${!myVar}' },
    { s: '${varOne && varTwo}', r: '${varOne&&varTwo}' },
    { s: '${varOne || varTwo}', r: '${varOne||varTwo}' },
    { s: '${varChoice ? varOne : varTwo}' },
  ],
  Comparison: [
    { s: '${nullValueOne == nullValueTwo}', r: '${nullValueOne===nullValueTwo}' },
    { s: '${nullValueOne != nullValueTwo}', r: '${nullValueOne!==nullValueTwo}' },
    { s: '${stringValueOne == stringValueTwo}', r: '${stringValueOne===stringValueTwo}' },
    { s: '${stringValueOne != stringValueTwo}', r: '${stringValueOne!==stringValueTwo}' },
    { s: '${numberValueOne < numberValueTwo}', r: '${numberValueOne<numberValueTwo}' },
    { s: '${numberValueOne <= numberValueTwo}', r: '${numberValueOne<=numberValueTwo}' },
    { s: '${numberValueOne == numberValueTwo}', r: '${numberValueOne===numberValueTwo}' },
    { s: '${numberValueOne >= numberValueTwo}', r: '${numberValueOne>=numberValueTwo}' },
    { s: '${numberValueOne > numberValueTwo}', r: '${numberValueOne>numberValueTwo}' },
    { s: '${numberValueOne != numberValueTwo}', r: '${numberValueOne!==numberValueTwo}' },
    { s: '${booleanValueOne == booleanValueTwo}', r: '${booleanValueOne===booleanValueTwo}' },
    { s: '${booleanValueOne != booleanValueTwo}', r: '${booleanValueOne!==booleanValueTwo}' },
    { s: '${enumConstant == \'CONSTANT_NAME\'}', r: '${enumConstant===\'CONSTANT_NAME\'}' },
  ],
  Options: [
    { s: '${myVar @ optName}' },
    { s: '${myVar @ optName=myVar}' },
    { s: '${myVar @ optName=true}' },
    { s: '${myVar @ optName=42}' },
    { s: '${myVar @ optName=\'string\'}' },
    { s: '${myVar @ optName="string"}', r: '${myVar @ optName=\'string\'}' },
    { s: '${myVar @ optName=[myVar, \'string\']}' },
    { s: '${myVar @ optName=(varOne && varTwo) || !varThree}', r: '${myVar @ optName=(varOne&&varTwo)||!varThree}' },
    { s: '${myVar @ optOne, optTwo=myVar, optThree=\'string\', optFour=[myVar, \'string\']}' },
  ],
  Fragments: [
    { s: 'Hello, ${myVar}.' },
    { s: '' },
    { s: 'Hello' },
    { s: '${myVar} Hello' },
    { s: 'Foo ${} Bar' },
  ],
};

/* eslint-enable no-template-curly-in-string */

/**
 * Simple tests that check if the parser can process all the expressions
 */
describe('HTL Expressions', () => {
  Object.keys(TESTS).forEach((name) => {
    const categ = TESTS[name];
    describe(name, () => {
      categ.forEach((test) => {
        it('evaluates the expression correctly', () => {
          const source = test.s;
          const expected = test.r || test.s;
          const result = process(source);
          assert.equal(result, expected);
        });
      });
    });
  });
});
