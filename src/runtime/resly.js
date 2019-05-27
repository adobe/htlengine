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
const Compiler = require('../compiler/Compiler');
const Runtime = require('./Runtime');

/**
 * HTL transformer for unified.
 * @param {*} options The transformer options
 * @param {string} options.code The HTL template code
 * @returns {function(): transformer}
 */
module.exports = function resly(options = {}) {
  if (!options.code) {
    throw Error('option.code is mandatory.');
  }

  async function compile(code) {
    const compiler = new Compiler()
      .withRuntimeVar('dom');
    return compiler.compileToFunction(code);
  }

  return function hastUtilHTL() {
    const runtime = new Runtime()
      .withDomFactory(new Runtime.HDOMFactory());

    return function transformer(node, file, next) {
      runtime.setGlobal('dom', node);

      compile(options.code)
        .then(main => main(runtime))
        .then((result) => {
          next(null, result, file);
        }).catch(next);
    };
  };
};
