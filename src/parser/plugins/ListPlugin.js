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
const Loop = require('../commands/Loop');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const UnaryOperation = require('../htl/nodes/UnaryOperation');
const UnaryOperator = require('../htl/nodes/UnaryOperator');
const Identifier = require('../htl/nodes/Identifier');

const ITEM_LOOP_STATUS_SUFFIX = 'List';
const DEFAULT_LIST_ITEM_VAR_NAME = 'item';

module.exports = class ListPlugin extends Plugin {
  constructor(signature, pluginContext, expression, location) {
    super(signature, pluginContext, expression);
    this._listVariable = pluginContext.generateVariable('collectionVar');
    this._collectionSizeVar = pluginContext.generateVariable('size');
    this._location = location;
  }

  beforeElement(stream/* , tagName */) {
    stream.write(new VariableBinding.Start(this._listVariable, this.expression.root));
    stream.write(new VariableBinding.Start(
      this._collectionSizeVar,
      new UnaryOperation(UnaryOperator.LENGTH, new Identifier(this._listVariable)),
    ));
    stream.write(new Conditional.Start(
      new Identifier(this._collectionSizeVar),
      false,
      this._location,
    ));
  }

  beforeChildren(stream) {
    const itemVariable = this._signature.getVariableName(DEFAULT_LIST_ITEM_VAR_NAME);
    const loopStatusVar = itemVariable + ITEM_LOOP_STATUS_SUFFIX;
    const indexVariable = this._pluginContext.generateVariable('index');
    stream.write(new Loop.Start(this._listVariable, itemVariable, indexVariable));
    stream.write(new VariableBinding.Start(
      loopStatusVar,
      new RuntimeCall('listInfo', null, [new Identifier(indexVariable), new Identifier(this._collectionSizeVar)]),
    ));
  }

  // eslint-disable-next-line class-methods-use-this
  afterChildren(stream) {
    stream.write(VariableBinding.END);
    stream.write(Loop.END);
  }

  // eslint-disable-next-line class-methods-use-this
  afterElement(stream) {
    stream.write(Conditional.END);
    stream.write(VariableBinding.END);
    stream.write(VariableBinding.END);
  }
};
