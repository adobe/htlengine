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

const Command = require('./Command');

module.exports = class PushElement extends Command {
  constructor(name, isEmpty, isVoid) {
    super();
    this._name = name;
    this._isEmpty = isEmpty;
    this._isVoid = isVoid;
  }

  get name() {
    return this._name;
  }

  get isEmpty() {
    return this._isEmpty;
  }

  get isVoid() {
    return this._isVoid;
  }
};
