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

const PLUGIN_ATTRIBUTE_PREFIX = 'data-sly-';

module.exports = class PluginSignature {
  constructor(name, args) {
    this._name = name;
    this._arguments = args || [];
  }

  get name() {
    return this._name;
  }

  get args() {
    return this._arguments;
  }

  static fromAttribute(attributeName) {
    if (!attributeName.startsWith(PLUGIN_ATTRIBUTE_PREFIX)) {
      return null;
    }

    const fragment = attributeName.substring(9);
    const parts = fragment.split('.');
    if (parts.length === 0) {
      return null;
    }
    return new PluginSignature(parts[0], parts.slice(1));
  }

  getVariableName(defaultValue) {
    const args = this._arguments;
    if (args.length > 0) {
      return args[0];
    }
    return defaultValue;
  }
};
