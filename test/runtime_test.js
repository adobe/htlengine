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

// built-in modules
const assert = require('assert');
const path = require('path');
// declared dependencies
const fse = require('fs-extra');
// local modules
const pkgJson = require('../package.json');
const Compiler = require('../src/compiler/Compiler');
const Runtime = require('../src/runtime/Runtime');

const TEMPLATE_SIMPLE_2 = path.resolve(__dirname, 'templates', 'simple2.htl');
const TEMPLATE_XSS = path.resolve(__dirname, 'templates', 'xss.htl');
const EXPECTED_SIMPLE_2 = path.resolve(__dirname, 'templates', 'simple2.html');
const EXPECTED_XSS = path.resolve(__dirname, 'templates', 'xss.html');
const EXPECTED_XSS_UNSAFE = path.resolve(__dirname, 'templates', 'xss_unsafe.html');
const GLOBALS = {
  world: 'Earth',
  properties: {
    title: 'Hello, world.',
    fruits: ['Apple', 'Banana', 'Orange'],
    comma: ', ',
  },
  nav: {
    foo: 'This is foo. ',
  },
  test: 'This is a test',
  qttMin: 4,
  qttMax: 4,
  expression: 'this is an expression.',
  it: {
    title: 'Hello, world!',
    children: [
      '<div>A</div>',
      '<div>B</div>',
    ],
  },
  /* eslint-disable no-script-url, no-tabs */
  xss: {
    aTag: '<a href="javascript:alert(0)">XSS Link</a>',
    aTag2: '<a href="http://www.valid.url">Non XSS Link</a>',
    aTag3: '<a title="javascript:alert(0)">Non XSS Link</a>',
    url1: 'javascript:alert(0)',
    url2: 'javascript://%0Dalert(0)', // js comment & return char
    url3: 'javascript:/*--><script>alert(0);</script>', // js comment & break out of html tag
    url4: 'javascript:alert(String.fromCharCode(48))', // avoiding quotes
    url5: '/foo', // rel part
    url6: 'https://www.primordialsoup.life/image.png', // absolute url
    url7: 'https://via.placeholder.com/1280x550&text=desktop%201280x550', // escaped url
    breakAttr: '"><script>alert(0);</script>', // break out of html tag
    eventHandler: 'alert(0)',
    imgTag1: '<img src="javascript:alert(0)"/>',
    imgTag2: '<img src="fake.jpg" onerror="alert(0)"/>',
    imgTag3: '<img src=`javascript:alert(0)`/>', // grave accent quotes
    imgTag4: '<img src="java	script:alert(0)"/>', // embedded tab
    imgTag5: '<img src="java&#x0A;script:alert(0)"/>', // embedded encoded tab
    scriptTag1: '<script>alert(0);</script>',
    scriptTag2: '<script src="http://do.not.serve/this.js"></script>',
    scriptTag3: '<script src="//do.not.serve/this.js"></script>', // protocol resolution bypass
  },
  /* eslint-enable no-script-url, no-tabs */
};

describe('Runtime Tests', () => {
  it('Executes a script', async () => {
    const outputDir = path.join(__dirname, 'generated');

    const compiler = new Compiler()
      .withDirectory(outputDir)
      .includeRuntime(true)
      .withRuntimeHTLEngine(path.resolve(__dirname, '..', pkgJson.main))
      .withOutputFile(path.resolve(outputDir, 'runtime_test_script_1.js'))
      .withRuntimeVar(Object.keys(GLOBALS));

    const filename = await compiler.compileFile(TEMPLATE_SIMPLE_2);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { main } = require(filename);

    const ret = await main(GLOBALS);
    assert.equal(ret, await fse.readFile(EXPECTED_SIMPLE_2, 'utf-8'));
  });

  it('Can set custom template', async () => {
    const outputDir = path.join(__dirname, 'generated');

    const customTemplate = await fse.readFile(path.resolve(__dirname, 'templates', 'custom_template.js'), 'utf-8');
    const compiler = new Compiler()
      .withDirectory(outputDir)
      .includeRuntime(true)
      .withRuntimeHTLEngine(path.resolve(__dirname, '..', pkgJson.main))
      .withOutputFile(path.resolve(outputDir, 'runtime_test_script_2.js'))
      .withRuntimeVar(Object.keys(GLOBALS))
      .withCodeTemplate(customTemplate);

    const filename = await compiler.compileFile(TEMPLATE_SIMPLE_2);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { main } = require(filename);

    const ret = await main(GLOBALS);
    assert.equal(ret, await fse.readFile(EXPECTED_SIMPLE_2, 'utf-8'));
  });

  it('Protects against XSS', async () => {
    const outputDir = path.join(__dirname, 'generated');

    const compiler = new Compiler()
      .withDirectory(outputDir)
      .includeRuntime(true)
      .withRuntimeHTLEngine(path.resolve(__dirname, '..', pkgJson.main))
      .withOutputFile(path.resolve(outputDir, 'runtime_test_script_3.js'))
      .withRuntimeVar(Object.keys(GLOBALS));

    const filename = await compiler.compileFile(TEMPLATE_XSS);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { main } = require(filename);

    const ret = await main(GLOBALS);
    assert.equal(ret, await fse.readFile(EXPECTED_XSS, 'utf-8'));
  });

  it('Protects against XSS (unsafe)', async () => {
    const outputDir = path.join(__dirname, 'generated');

    const compiler = new Compiler()
      .withDefaultMarkupContext('unsafe')
      .withDirectory(outputDir)
      .includeRuntime(true)
      .withRuntimeHTLEngine(path.resolve(__dirname, '..', pkgJson.main))
      .withOutputFile(path.resolve(outputDir, 'runtime_test_script_4.js'))
      .withRuntimeVar(Object.keys(GLOBALS));

    const filename = await compiler.compileFile(TEMPLATE_XSS);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { main } = require(filename);

    const ret = await main(GLOBALS);
    assert.equal(ret.trim(), (await fse.readFile(EXPECTED_XSS_UNSAFE, 'utf-8')).trim());
  });

  it('Resolves templates correct', async () => {
    const outputDir = path.join(__dirname, 'generated');

    const dir = path.resolve(__dirname);
    const comp = new Compiler()
      .withRuntimeGlobalName('data')
      .withDirectory(dir)
      .withOutputFile(path.resolve(outputDir, 'relative_and_global.js'))
      .includeRuntime(false);
    const htlFile = path.resolve(dir, 'templates', 'relative_and_global', 'list.htl');
    const exp = await fse.readFile(path.resolve(dir, 'templates', 'relative_and_global', 'exp.html'), 'utf-8');

    const filename = await comp.compileFile(htlFile);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const main = require(filename);

    const runtime = new Runtime();
    runtime.setGlobal({
      title: 'Hello, world.',
      list: [
        { title: 'item 1' },
        { title: 'item 2' },
        { title: 'item 3' },
      ],
    });
    const html = await main(runtime);
    assert.equal(html, exp);
  });
});
