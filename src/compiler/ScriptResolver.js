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
 * Creates a script resolver.
 * @param {string[]} roots Root directories for resolution.
 */
module.exports = function createResolver(roots) {
  if (!Array.isArray(roots)) {
    // eslint-disable-next-line no-param-reassign
    roots = [roots];
  }

  /**
   * Resolves the script against the given roots.
   * @param {string} baseDir additional root
   * @param {string} uri script uri
   * @returns {Promise<string>}
   */
  async function resolve(baseDir, uri) {
    let bases = [baseDir, ...roots];

    // if uri starts with '.' or '..', only consider specified bases.
    // otherwise also consider apps and libs.
    if (!uri.startsWith('./') && !uri.startsWith('../')) {
      bases = bases.reduce((prev, root) => {
        prev.push(root);
        prev.push(path.resolve(root, 'apps'));
        prev.push(path.resolve(root, 'libs'));
        return prev;
      }, []);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const base of bases) {
      const scriptPath = path.resolve(base, uri);
      // eslint-disable-next-line no-await-in-loop
      if (await fse.pathExists(scriptPath)) {
        return scriptPath;
      }
    }
    throw Error(`Unable to resolve script: ${uri}. Search Path: ${bases}`);
  }

  return resolve;
};
