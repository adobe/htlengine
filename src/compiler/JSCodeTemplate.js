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

/* eslint-disable */
module.exports = function main(runtime) {
  const lengthOf = function (c) {
    return Array.isArray(c) ? c.length : Object.keys(c).length;
  };

  const out = runtime.out.bind(runtime);
  const exec = runtime.exec.bind(runtime);
  const xss = runtime.xss.bind(runtime);
  const listInfo = runtime.listInfo.bind(runtime);
  const use = runtime.use.bind(runtime);
  const slyResource = runtime.resource.bind(runtime);

  return runtime.run(function* () {

    // RUNTIME_GLOBALS

    // CODE
  });
};
