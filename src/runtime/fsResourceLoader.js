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
const fs = require('fs');

/**
 * Creates an FS based resource loader using the `resourceDir` as base directory.
 * @param {string} resourceDir The directory to resolve resources.
 */
module.exports = function createResourceLoader(resourceDir) {
  /**
   * Load the resource with the give uri.
   * @param {Runtime} runtime current runtime
   * @param {string} uri resource uri
   * @returns {Promise<*>} the resource
   */
  return async (runtime, uri) => {
    const resourcePath = path.resolve(resourceDir, uri);

    return new Promise((resolve, reject) => {
      fs.readFile(resourcePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
};
