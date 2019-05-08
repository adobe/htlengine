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
const BooleanConstant = require('../htl/nodes/BooleanConstant');
const StringConstant = require('../htl/nodes/StringConstant');

module.exports = class UnwrapPlugin extends Plugin {
  beforeElement(stream/* , tagName */) {
    const ctx = this.pluginContext;
    this.variableName = this._signature.getVariableName(null);
    this._useGlobalBinding = this.variableName != null;
    if (this.variableName == null) {
      this.variableName = ctx.generateVariable('unwrapCondition');
    }

    this.unwrapTest = new Conditional.Start(this.variableName, true);

    if (this._useGlobalBinding) {
      stream.write(new VariableBinding.Global(this.variableName, this.expression.root));
    } else {
      stream.write(new VariableBinding.Start(this.variableName, this.testRoot()));
    }
  }

  beforeTagOpen(stream) {
    stream.write(this.unwrapTest);
  }

  // eslint-disable-next-line class-methods-use-this
  afterTagOpen(stream) {
    stream.write(Conditional.END);
  }

  beforeTagClose(stream) {
    stream.write(this.unwrapTest);
  }

  // eslint-disable-next-line class-methods-use-this
  afterTagClose(stream) {
    stream.write(Conditional.END);
  }

  afterElement(stream) {
    if (!this._useGlobalBinding) {
      stream.write(VariableBinding.END);
    }
  }

  testRoot() {
    const testNode = this.expression.root instanceof StringConstant
      && this.expression.root.text.length === 0;
    return testNode ? BooleanConstant.TRUE : this.expression.root;
  }
};
