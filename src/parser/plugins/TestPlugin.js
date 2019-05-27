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

const Plugin = require('../html/Plugin');
const VariableBinding = require('../commands/VariableBinding');
const Conditional = require('../commands/Conditional');
const Identifier = require('../htl/nodes/Identifier');

module.exports = class TestPlugin extends Plugin {
  beforeElement(stream) {
    const ctx = this.pluginContext;
    let variableName = this._signature.getVariableName(null);
    this._useGlobalBinding = variableName != null;
    if (variableName == null) {
      variableName = ctx.generateVariable('testVariable');
    }

    if (this._useGlobalBinding) {
      stream.write(new VariableBinding.Global(variableName, this.expression.root));
    } else {
      stream.write(new VariableBinding.Start(variableName, this.expression.root));
    }
    stream.write(new Conditional.Start(new Identifier(variableName)));
  }

  afterElement(stream) {
    stream.write(Conditional.END);
    if (!this._useGlobalBinding) {
      stream.write(VariableBinding.END);
    }
  }
};
