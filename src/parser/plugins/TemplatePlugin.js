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
const Plugin = require('../html/Plugin');

module.exports = class TemplatePlugin extends Plugin {
  beforeElement(stream) {
    const variableName = this._signature.getVariableName(null).toLowerCase();
    if (variableName === null) {
      throw new Error('data-sly-template must be called with an identifier');
    }
    stream.beginFunction(variableName, this._expression.options);
    stream.beginIgnore();
  }

  // eslint-disable-next-line class-methods-use-this
  beforeChildren(stream) {
    stream.endIgnore();
  }

  // eslint-disable-next-line class-methods-use-this
  afterChildren(stream) {
    stream.endFunction();
    stream.beginIgnore();
  }

  // eslint-disable-next-line class-methods-use-this
  afterElement(stream) {
    stream.endIgnore();
  }
};
