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

module.exports = class UnwrapPlugin extends Plugin {

  constructor(signature, pluginContext, expression) {
    super(signature, pluginContext, expression);

    const ctx = this.pluginContext;
    this.variableName = this._signature.getVariableName(null);
    this._useGlobalBinding = this.variableName != null;
    if (this.variableName == null) {
      this.variableName = ctx.generateVariable('unwrapCondition');
    }
  }

  beforeElement(stream/* , tagName */) {
    if (this._useGlobalBinding) {
      stream.write(new VariableBinding.Global(this.variableName, this.expression.root));
    } else {
      stream.write(new VariableBinding.Start(this.variableName, this.expression.root));
    }
  }

  beforeTagOpen(stream) {
    stream.write(new Conditional.Start(this.variableName, true));
  }

  afterTagOpen(stream) {
    stream.write(Conditional.END);
  }

  beforeTagClose(stream) {
    stream.write(new Conditional.Start(this.variableName, true));
  }

  afterTagClose(stream) {
    stream.write(Conditional.END);
  }

  afterElement(stream) {
    if (!this._useGlobalBinding) {
      stream.write(VariableBinding.END);
    }
  }
};
