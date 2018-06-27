/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const Plugin = require('../html/Plugin');
const OutputVariable = require('../commands/OutputVariable');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const VariableBinding = require('../commands/VariableBinding');

module.exports = class ResourcePlugin extends Plugin {
  beforeChildren(stream) {
    const variableName = this.pluginContext.generateVariable('resourceContent');
    const runtimeCall = new RuntimeCall('resource', this._expression.root);
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
