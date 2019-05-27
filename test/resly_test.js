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

/* eslint-env mocha */
/* eslint-disable no-template-curly-in-string */
const assert = require('assert');
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');
const { resly } = require('../src/index.js');

const code = '<!DOCTYPE html><html><head><title>${dom.children[0].children[0].value}</title></head>\n'
  + '<body>\n'
  + '<h1>Table of Contents</h1>\n'
  + '<ul data-sly-list="${dom.children}">'
  + '<li data-sly-test="${item.tagName==\'h1\' || item.tagName==\'h2\'}">${item}\n</li>'
  + '</ul>\n'
  + '</body>';

const md = `# Example
## Part 1
Foo Bar.
## Part 2
Hello, world
`;

const expected = '<!doctype html><html><head><title>Example</title></head>\n'
  + '<body>\n'
  + '<h1>Table of Contents</h1>\n'
  + '<ul><li><h1>Example</h1>\n'
  + '</li><li><h2>Part 1</h2>\n'
  + '</li><li><h2>Part 2</h2>\n'
  + '</li></ul>\n'
  + '</body></html>';

describe('resly test', () => {
  it('can transform simple hast', (done) => {
    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(resly({ code }))
      .use(html)
      .process(md, (err, file) => {
        if (err) {
          done(err);
          return;
        }
        try {
          assert.equal(String(file), expected);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
