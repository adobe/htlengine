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

const Compiler = require('./compiler/Compiler');

module.exports = function main(resource, template) {
  const compiler = new Compiler()
    .withOutputDirectory('.')
    .includeRuntime(true)
    .withRuntimeVar(Object.keys(resource));

  const filename = compiler.compile(template, './out.js');
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const service = require(filename);
  return service(resource);
};

