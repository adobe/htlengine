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
const OutputVariable = require('../commands/OutputVariable');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const MapLiteral = require('../htl/nodes/MapLiteral');
const VariableBinding = require('../commands/VariableBinding');
const StringConstant = require('../htl/nodes/StringConstant');
const NullLiteral = require('../htl/nodes/NullLiteral');

function getOption(map, name, defaultValue) {
  const exp = map[name];
  if (!exp || (exp instanceof NullLiteral)) {
    return defaultValue;
  }
  // eslint-disable-next-line no-param-reassign
  delete map[name];
  if (!(exp instanceof StringConstant)) {
    throw Error(`data-sly-include option '${name}' needs string constant.`);
  }
  return exp.text;
}

module.exports = class IncludePlugin extends Plugin {
  beforeChildren(stream) {
    // todo: support dynamic includes
    let file = null;
    if (!(this._expression.root instanceof NullLiteral)) {
      if (!(this._expression.root instanceof StringConstant)) {
        throw Error('data-sly-include needs string constant for include file.');
      }
      file = this._expression.root.text;
    }
    file = getOption(this._expression.options, 'file', file);
    if (!file) {
      throw Error('data-sly-include needs file.');
    }
    const prepend = getOption(this._expression.options, 'prependPath', null);
    if (prepend) {
      file = `${prepend}/${file}`;
    }
    const append = getOption(this._expression.options, 'appendPath', null);
    if (append) {
      file = `${file}/${append}`;
    }
    file = file.replace(/\/+/g, '/');

    const variableName = this.pluginContext.generateVariable('includeContent');
    const runtimeCall = new RuntimeCall('include', new StringConstant(file), [new MapLiteral(this._expression.options)]);
    stream.write(new VariableBinding.Global(variableName, runtimeCall));
    stream.write(new OutputVariable(variableName));
    stream.write(VariableBinding.END);
    stream.beginIgnore();
  }

  // eslint-disable-next-line class-methods-use-this
  afterChildren(stream) {
    stream.endIgnore();
  }
};
