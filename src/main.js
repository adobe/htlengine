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

// built-in modules
const path = require('path');
// declared dependencies
const fse = require('fs-extra');
// local modules
const Compiler = require('./compiler/Compiler');

/**
 * Simple engine that compiles the given template and executes it.
 * @param resource the global object to pass into the script
 * @param template the HTL script
 * @returns A promise that resolves to the evaluated code.
 */
module.exports = async function main(resource, template) {
  const compiler = new Compiler()
    .withOutputDirectory('.')
    .includeRuntime(true)
    .withRuntimeVar(Object.keys(resource))
    .withSourceMap(true);

  let code = await compiler.compileToString(template);
  code = code.replace('@adobe/htlengine', './src/index.js');

  const filename = path.resolve(process.cwd(), './out.js');
  await fse.writeFile(filename, code, 'utf-8');

  // eslint-disable-next-line import/no-dynamic-require,global-require
  delete require.cache[require.resolve(filename)];
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const service = require(filename);
  return service.main(resource);
};
