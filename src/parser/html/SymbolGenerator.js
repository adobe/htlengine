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

const DEFAULT_VAR_PREFIX = 'var_';

module.exports = class SymbolGenerator {
  constructor(prefix) {
    this._prefix = prefix || DEFAULT_VAR_PREFIX;
    this._counter = -1;
  }

  next(hint) {
    const middle = hint ? hint.replace('-', '_') : '';
    this._counter += 1;
    return this._prefix + middle + this._counter;
  }
};
