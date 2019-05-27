/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable */

const { JSDOM } = require('jsdom');
const { Compiler, Runtime } = require('@adobe/htlengine');

const code = ''
  + '<sly data-sly-use.doc="helper.js"/>'
  + '<!DOCTYPE html>'
  + '<html><head><title>${doc.title}</title></head>\n'
  + '<body>\n'
  + '<h1>Table of Contents</h1>\n'
  + '<ul data-sly-list="${doc.headings}">'
  + '<li>${item.innerHTML}\n</li>'
  + '</ul>\n'
  + '</body>'
  + '</html>';

const html = ''
  + '<h1>JSDOM Example</h1>'
  + 'This example shows how t use JSDOM with the HTL Engine.'
  + '<h2>Install</h2>'
  + 'foo bar...'
  + '<h2>Run</h2>'
  + 'npm test'
  + '<h2>Development</h2>'
  + 'contributions welcome';

async function run() {
  // setup the HTL compiler
  const compiler = new Compiler().withRuntimeVar('document');

  // compile the script to a executable template function
  const template = await compiler.compileToFunction(code);

  // generate the input data using JSDOM
  const document = new JSDOM(html).window.document;

  // create a dom factory, providing a document implementation
  const domFactory = new Runtime.VDOMFactory(document.implementation);

  // create the HTL runtime
  const runtime = new Runtime()
    .withDomFactory(domFactory)
    .setGlobal({
      document
    });

  // finally, execute the template. the result is a Document.
  const result = await template(runtime);
  return `<!DOCTYPE ${result.doctype.name}>${result.documentElement.outerHTML}`;
}

run().then(console.log).catch(console.error);
