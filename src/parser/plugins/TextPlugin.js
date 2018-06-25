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
const VariableBinding = require('../commands/VariableBinding');
const OutputVariable = require('../commands/OutputVariable');
const ExpressionContext = require('../html/ExpressionContext');
const MarkupContext = require('../html/MarkupContext');

module.exports = class TextPlugin extends Plugin {
  beforeChildren(stream) {
    const ctx = this.pluginContext;
    const variable = ctx.generateVariable('textContent');
    stream.write(new VariableBinding.Start(
      variable,
      ctx.adjustToContext(this.expression, MarkupContext.TEXT, ExpressionContext.TEXT).root,
    ));
    stream.write(new OutputVariable(variable));
    stream.write(VariableBinding.END);
    stream.beginIgnore();
  }

  // eslint-disable-next-line class-methods-use-this
  afterChildren(stream) {
    stream.endIgnore();
  }
};
