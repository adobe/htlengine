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
const TemplateReference = require('../commands/TemplateReference');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const MapLiteral = require('../htl/nodes/MapLiteral');
const StringConstant = require('../htl/nodes/StringConstant');

const DEFAULT_VARIABLE_NAME = 'useBean';

module.exports = class UsePlugin extends Plugin {
  beforeElement(stream/* , tagName */) {
    const variableName = this._signature.getVariableName(DEFAULT_VARIABLE_NAME);

    // check for template reference. currently only static external templates supported,
    // as we can't compile them during runtime.
    if (this._expression.root instanceof StringConstant) {
      const lib = this._expression.root.text;
      if (lib.endsWith('.htl') || lib.endsWith('.html')) {
        // stream.write(new VariableBinding.Global(variableName, new MapLiteral({})));
        stream.write(new TemplateReference(variableName, lib));
        return;
      }
    }
    stream.write(new VariableBinding.Global(
      variableName,
      new RuntimeCall('use', this._expression.root, [new MapLiteral(this._expression.options)]),
    ));
  }
};
