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

/* eslint-disable no-unused-vars,class-methods-use-this */

module.exports = class Plugin {
  constructor(signature, pluginContext, expression) {
    this._signature = signature;
    this._pluginContext = pluginContext;
    this._expression = expression;
  }

  isValid() {
    return true;
  }

  get pluginContext() {
    return this._pluginContext;
  }

  get expression() {
    return this._expression;
  }

  beforeElement(stream, tagName) {
  }

  beforeTagOpen(stream) {
  }

  beforeAttributes(stream) {
  }

  beforeAttribute(stream, attributeName) {
  }

  beforeAttributeValue(stream, attributeName, attributeValue) {
  }

  afterAttributeValue(stream, attributeName) {
  }

  afterAttribute(stream, attributeName) {
  }

  onPluginCall(stream, signature, expression) {
  }

  afterAttributes(stream) {
  }

  afterTagOpen(stream) {
  }

  beforeChildren(stream) {
  }

  afterChildren(stream) {
  }

  beforeTagClose(stream, isSelfClosing) {
  }

  afterTagClose(stream, isSelfClosing) {
  }

  afterElement(stream) {
  }
};
