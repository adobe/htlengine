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
const path = require('path');

const Runtime = require('../src/runtime/Runtime');
const Compiler = require('../src/compiler/Compiler');


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
        input: '',
      };
      tests.push(test);
    } else if (line.startsWith('---')) {
      test.commands = '';
    } else if (line.startsWith('===')) {
      test.output = '';
    } else if (test && ('output' in test)) {
      test.output += `${line}\n`;
    } else if (test && ('commands' in test)) {
      test.commands += `${line}\n`;
    } else if (test && ('input' in test)) {
      test.input += `${line}\n`;
    }
  });
  return tests;
}

describe('Compiler Tests', () => {
  fs.readdirSync('test/specs').forEach((filename) => {
    if (filename.endsWith('_spec.txt')) {
      const name = filename.substring(0, filename.length - 9);
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const payload = require(`./specs/${name}_spec.js`);

      const tests = readTests(`test/specs/${filename}`);
      const outputDir = path.join(__dirname, 'generated');
      try {
        fs.mkdirSync(outputDir);
      } catch (e) {
        // ignore
      }

      const compiler = new Compiler()
        .withOutputDirectory(outputDir)
        .withRuntimeVar(Object.keys(payload));

      describe(name, () => {
        let idx = 0;

        tests.forEach((test) => {
          if (!test.input) {
            return;
          }
          const copiledFilename = compiler.compile(test.input, `${name}_${idx}.js`);
          if ('output' in test) {
            it(`${idx}. Generates output for '${test.name}' correctly.`, (done) => {
              const runtime = new Runtime()
                .withUseDirectory(path.join(__dirname, 'specs'))
                .withResourceDirectory(path.join(__dirname, 'specs'))
                .setGlobal(payload);

              // eslint-disable-next-line import/no-dynamic-require,global-require
              const service = require(copiledFilename);
              service(runtime).then(() => {
                const output = runtime.stream;
                assert.equal(output, test.output);
                done();
              }).catch(done);
            });
          }
          idx += 1;
        });
      });
    }
  });
});
