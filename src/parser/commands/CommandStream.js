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

const Conditional = require('./Conditional');
const BooleanConstant = require('../htl/nodes/BooleanConstant');
const OutText = require('./OutText');

module.exports = class CommandStream {
  constructor() {
    this._commands = [];
    this._warnings = [];
    this._wasText = false;
  }

  write(command) {
    const isText = command instanceof OutText;
    if (isText && this._wasText) {
      this._commands[this._commands.length - 1].append(command.text);
      return;
    }
    this._wasText = isText;
    this._commands.push(command);
  }

  warn(message, code) {
    this._warnings.push({
      message,
      code,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
  }

  get commands() {
    return this._commands;
  }

  beginIgnore() {
    this.write(new Conditional.Start(BooleanConstant.FALSE));
  }

  endIgnore() {
    this.write(Conditional.END);
  }
};
