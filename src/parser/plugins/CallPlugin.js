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
const FunctionCall = require('../commands/FunctionCall');
const MapLiteral = require('../htl/nodes/MapLiteral');

module.exports = class CallPlugin extends Plugin {
  beforeChildren(stream) {
    stream.write(
      new FunctionCall(
        this._expression.root,
        new MapLiteral(this._expression.options),
        this.location,
      ),
    );
    stream.beginIgnore();
  }

  // eslint-disable-next-line class-methods-use-this
  afterChildren(stream) {
    stream.endIgnore();
  }
};
