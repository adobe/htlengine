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

/* eslint-env mocha */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map/source-map.js');
const unified = require('unified');
const tohtml = require('rehype-stringify');
const { JSDOM } = require('jsdom');
const Runtime = require('../src/runtime/Runtime');
const Compiler = require('../src/compiler/Compiler');

function serializeDom(node) {
  if (node.doctype) {
    return `<!DOCTYPE ${node.doctype.name}>${node.documentElement.outerHTML}`;
  }
  if (node.innerHTML) {
    return node.innerHTML;
  }
  return '';
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
        input: '',
      };
      tests.push(test);
    } else if (line.startsWith('---')) {
      test.commands = '';
    } else if (line.startsWith('===')) {
      test.output = '';
    } else if (line.startsWith('^^^')) {
      test.mappedOutput = '';
    } else if (test && ('mappedOutput' in test)) {
      test.mappedOutput += `${line}\n`;
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

function runTests(specs, typ = '', runtimeFn = () => {}, resultFn = ret => ret) {
  Object.keys(specs).forEach((name) => {
    const filename = specs[name];
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
      .withRuntimeVar(Object.keys(payload))
      .withSourceMap(true);

    describe(name, async () => {
      tests.forEach((test, idx) => {
        if (!test.input) {
          return;
        }
        if ('output' in test) {
          it(`${idx}. Generates output for '${test.name}' correctly.`, (done) => {
            const runtime = new Runtime()
              .withUseDirectory(path.join(__dirname, 'specs'))
              .withResourceDirectory(path.join(__dirname, 'specs'))
              .setGlobal(payload);
            runtimeFn(runtime);

            compiler.compileToFile(test.input, `${name}_${idx}${typ}.js`, path.join(__dirname, 'specs'))
              .then((compiledFilename) => {
                // eslint-disable-next-line import/no-dynamic-require,global-require
                const service = require(compiledFilename);
                service(runtime).then((ret) => {
                  const output = resultFn(ret);
                  assert.equal(output.trim(), test.output.trim());
                  done();
                }).catch(done);
              }).catch(done);
          });
        }
        if ('mappedOutput' in test) {
          it(`${idx}. Maps lines for '${test.name}' correctly.`, (done) => {
            compiler.compile(test.input)
              .then(({ template, sourceMap }) => {
                const lines = template.split('\n');
                return SourceMapConsumer.with(sourceMap, null, (consumer) => {
                  let result = '';
                  consumer.eachMapping((mapping) => {
                    const lineNumber = mapping.generatedLine - 1;
                    if (lineNumber < 0 || lineNumber >= lines.length) {
                      assert.fail(`mapped line number ${lineNumber} outside generated file (0, ${lines.length})`);
                    }
                    result += `${lines[lineNumber]}\n`;
                  });
                  return result;
                }).then((mappedOutput) => {
                  assert.equal(mappedOutput.trim(), test.mappedOutput.trim());
                  done();
                }).catch(done);
              });
          });
        }
      });
    });
  });
}

describe('Compiler Tests (HAST)', () => {
  const specs = {};
  fs.readdirSync('test/specs').forEach((filename) => {
    if (filename.endsWith('_spec_hast.txt')) {
      const name = filename.substring(0, filename.length - 9 - 5);
      specs[name] = filename;
    }
  });
  runTests(specs, '_hst', (runtime) => {
    runtime.withDomFactory(new Runtime.HDOMFactory());
  }, ret => unified().use(tohtml).stringify(ret));
});

describe('Compiler Tests (JSDOM)', () => {
  const specs = {};
  fs.readdirSync('test/specs').forEach((filename) => {
    if (filename.endsWith('_spec_hast.txt')) {
      const name = filename.substring(0, filename.length - 9 - 5);
      if (!specs[name]) {
        specs[name] = filename;
      }
    } else if (filename.endsWith('_spec_jsd.txt')) {
      const name = filename.substring(0, filename.length - 9 - 4);
      specs[name] = filename;
    }
  });
  runTests(specs, '_jsd', (runtime) => {
    runtime.withDomFactory(new Runtime.VDOMFactory(new JSDOM().window.document.implementation));
  }, serializeDom);
});

describe('Compiler Tests (HTML)', () => {
  const specs = {};
  fs.readdirSync('test/specs').forEach((filename) => {
    if (filename.endsWith('_spec.txt')) {
      const name = filename.substring(0, filename.length - 9);
      specs[name] = filename;
    }
  });
  runTests(specs);
});
