/*
 * Copyright 2020 Adobe. All rights reserved.
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
const path = require('path');
const fse = require('fs-extra');
const Compiler = require('../src/compiler/Compiler');
const Runtime = require('../src/runtime/Runtime');
const ExternalTemplateLoader = require('../src/compiler/ExternalTemplateLoader');

const testData = require('./multi/test-data.js');

describe('External Templates Tests', () => {
  it('Renders component normally', async () => {
    const outputDir = path.join(__dirname, 'generated');
    const dir = path.resolve(__dirname);
    const comp = new Compiler()
      .withRuntimeGlobalName('data')
      .withDirectory(dir)
      .includeRuntime(false);

    const htlFile1 = path.resolve(dir, 'multi', 'list.htl');
    const htlFile2 = path.resolve(dir, 'multi', 'tabs.htl');
    const exp1 = await fse.readFile(path.resolve(dir, 'multi', 'list-expected.html'), 'utf-8');
    const exp2 = await fse.readFile(path.resolve(dir, 'multi', 'tabs-expected.html'), 'utf-8');

    const filename1 = await comp.withOutputFile(path.resolve(outputDir, 'multi-normal-list.js')).compileFile(htlFile1);
    const filename2 = await comp.withOutputFile(path.resolve(outputDir, 'multi-normal-tabs.js')).compileFile(htlFile2);

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const main1 = require(filename1);
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const main2 = require(filename2);

    const runtime = new Runtime();
    runtime.setGlobal(testData);
    const html1 = await main1(runtime);
    assert.equal(html1, exp1);
    const html2 = await main2(runtime);
    assert.equal(html2, exp2);
  });

  it('Renders component with external template loader', async () => {
    const outputDir = path.join(__dirname, 'generated');
    const dir = path.resolve(__dirname);

    const comp = new Compiler()
      .withRuntimeGlobalName('data')
      .withDirectory(outputDir)
      .includeRuntime(false);

    const extLoader = ExternalTemplateLoader({
      compiler: comp,
      outputDirectory: outputDir,
    });
    comp.withTemplateLoader(extLoader);

    const htlFile1 = path.resolve(dir, 'multi', 'list.htl');
    const htlFile2 = path.resolve(dir, 'multi', 'tabs.htl');
    const exp1 = await fse.readFile(path.resolve(dir, 'multi', 'list-expected.html'), 'utf-8');
    const exp2 = await fse.readFile(path.resolve(dir, 'multi', 'tabs-expected.html'), 'utf-8');

    const filename1 = await comp.compileFile(htlFile1, 'multi-external-list.js');
    const filename2 = await comp.compileFile(htlFile2, 'multi-external-tabs.js');

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const main1 = require(filename1);
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const main2 = require(filename2);

    const runtime = new Runtime();
    runtime.setGlobal(testData);
    const html1 = await main1(runtime);
    assert.equal(html1, exp1);
    const html2 = await main2(runtime);
    assert.equal(html2, exp2);
  });
});
