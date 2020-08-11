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
const path = require('path');
const fse = require('fs-extra');

/**
 * Creates a template loader that compiles the templates and returns their exec function.
 */
module.exports = function createLoader(opts) {
  const {
    compiler,
    outputDirectory,
  } = opts;

  /**
   * Load the template.
   * @param {string} templatePath template path
   * @param {string} scriptId the script id
   * @returns {Promise<>} the template source and resolved path
   */
  async function load(templatePath, scriptId) {
    const comp = await compiler.createTemplateCompiler(templatePath, outputDirectory, scriptId);
    const filename = `${path.basename(templatePath)}.js`;
    const outfile = path.resolve(outputDirectory, filename);
    const source = await fse.readFile(templatePath, 'utf-8');
    const file = await comp.compileToFile(source, outfile, compiler.dir);
    return {
      path: file,
      code: `require(${JSON.stringify(file)})($);`,
    };
  }

  return load;
};
