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

const fs = require('fs');
const path = require('path');

const unified = require('unified');
const stream = require('unified-stream');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

const { resly } = require('@adobe/htlengine');

const code = '<!DOCTYPE html><html><head><title>${dom.children[0].children[0].value}</title></head>\n'
  + '<body>\n'
  + '<h1>Table of Contents</h1>\n'
  + '<ul data-sly-list="${dom.children}">'
  + '<li data-sly-test="${item.tagName==\'h1\' || item.tagName==\'h2\'}">${item}\n</li>'
  + '</ul>\n'
  + '</body>';

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(resly({ code }))
  .use(html);

const readme = fs.createReadStream(path.resolve(__dirname, '../../', 'README.md'));
readme.pipe(stream(processor)).pipe(process.stdout);
