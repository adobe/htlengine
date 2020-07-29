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

const Command = require('./Command');

module.exports = class FileReference extends Command {
  constructor(name, filename, args) {
    super();
    this._name = name;
    this._filename = filename;
    this._args = args || [];
    this._id = null;
  }

  get name() {
    return this._name;
  }

  get filename() {
    return this._filename;
  }

  set id(value) {
    this._id = value;
  }

  get id() {
    return this._id;
  }

  get args() {
    return this._args;
  }

  isTemplate() {
    return this._filename.endsWith('.htl') || this._filename.endsWith('.html');
  }
};
