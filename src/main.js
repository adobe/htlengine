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

const { Compiler, Runtime } = require('./index.js');

/**
 * Simple engine that compiles the given template and executes it.
 * @param {*} resource the global object to pass into the script
 * @param {string} template the HTL script
 * @returns A promise that resolves to the evaluated code.
 */
module.exports = async function main(resource, template) {
  // setup the HTL compiler
  const compiler = new Compiler().withRuntimeVar(Object.keys(resource));

  // compile the script to a executable template function
  const fn = await compiler.compileToFunction(template);

  // create the HTL runtime
  const runtime = new Runtime()
    .setGlobal(resource);

  // finally, execute the template function and return the result
  return fn(runtime);
};
