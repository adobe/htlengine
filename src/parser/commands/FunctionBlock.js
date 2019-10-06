/*
 * Copyright 2018 Deloitte Digital. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// eslint-disable-next-line max-classes-per-file
const Command = require('./Command');

class Start extends Command {
  constructor(expression, options) {
    super();
    this._expression = expression;
    this._options = options;
  }

  get expression() {
    return this._expression;
  }

  get options() {
    return this._options;
  }

  get args() {
    return Object.keys(this._options);
  }
}

class End extends Command {}

const END = new End();

module.exports = {
  Start,
  End,
  END,
};
