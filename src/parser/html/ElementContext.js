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

const PluginProxy = require('./PluginProxy');

/**
 * The element context contains the information about the current processed element in the markup
 * handler, @type {module.ElementContext}
 */
module.exports = class ElementContext {
  constructor(tagName) {
    this._tagName = tagName;
    this._attributes = {};
    this._isSlyTag = tagName.toLowerCase() === 'sly';
    this._plugin = new PluginProxy();
  }

  addAttribute(name, value, location) {
    this._attributes[name] = {
      name,
      value,
      location,
    };
  }

  addPluginAttribute(name, signature, expression) {
    this._attributes[name] = {
      name,
      signature,
      expression,
    };
  }

  addCallbackAttribute(name, callback) {
    this._attributes[name] = {
      name,
      callback,
    };
  }

  get tagName() {
    return this._tagName;
  }

  get isSlyTag() {
    return this._isSlyTag;
  }

  get attributes() {
    return this._attributes;
  }

  addPlugin(p) {
    this._plugin.add(p);
  }

  get plugin() {
    return this._plugin;
  }
};
