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

module.exports = class Scope {
  constructor(parent) {
    this._props = {};
    this._parent = parent;
  }

  setVariable(name, value) {
    this._props[name] = value;
  }

  getVariable(name) {
    if (name in this._props) {
      return this._props[name];
    }
    if (this._parent) {
      return this._parent.getVariable(name);
    }
    return null;
  }

  putAll(obj) {
    Object.keys(obj).forEach((k) => {
      this.setVariable(k, obj[k]);
    });
  }
};
