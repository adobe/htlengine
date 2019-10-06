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

const Plugin = require('./Plugin');

module.exports = class PluginProxy {
  constructor() {
    this._plugins = [];
  }

  add(plugin) {
    this._plugins.push(plugin);
  }

  _delegate(fn, args) {
    this._plugins.forEach((p) => {
      p[fn](...args);
    });
  }
};

Object.getOwnPropertyNames(Plugin.prototype).filter((p) => p.startsWith('before') || p.startsWith('after') || p.startsWith('on')).forEach((fn) => {
  module.exports.prototype[fn] = function () { // eslint-disable-line func-names
    this._delegate(fn, arguments); // eslint-disable-line prefer-rest-params
  };
});
