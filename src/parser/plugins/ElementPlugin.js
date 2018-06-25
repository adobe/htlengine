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
const Conditional = require('../commands/Conditional');
const OutputVariable = require('../commands/OutputVariable');
const OutText = require('../commands/OutText');
const MarkupContext = require('../html/MarkupContext');
const ExpressionContext = require('../html/ExpressionContext');

module.exports = class ElementPlugin extends Plugin {
  constructor(signature, pluginContext, expression) {
    super(signature, pluginContext, expression);

    this.node = pluginContext.adjustToContext(
      expression,
      MarkupContext.ELEMENT_NAME,
      ExpressionContext.ELEMENT,
    ).root;
    this.tagVar = pluginContext.generateVariable('tagVar');
  }

  beforeElement(stream/* , tagName */) {
    stream.write(new VariableBinding.Start(this.tagVar, this.node));
  }

  beforeTagOpen(stream) {
    stream.write(new Conditional.Start(this.tagVar));
    stream.write(new OutText('<'));
    stream.write(new OutputVariable(this.tagVar));
    stream.write(Conditional.END);
    stream.write(new Conditional.Start(this.tagVar, true));
  }

  // eslint-disable-next-line class-methods-use-this
  beforeAttributes(stream) {
    stream.write(Conditional.END);
  }

  beforeTagClose(stream, isSelfClosing) {
    if (!isSelfClosing) {
      stream.write(new Conditional.Start(this.tagVar));
      stream.write(new OutText('</'));
      stream.write(new OutputVariable(this.tagVar));
      stream.write(new OutText('>'));
      stream.write(Conditional.END);
    }
    stream.write(new Conditional.Start(this.tagVar, true));
  }

  // eslint-disable-next-line class-methods-use-this
  afterTagClose(stream/* , isSelfClosing */) {
    stream.write(Conditional.END);
  }

  // eslint-disable-next-line class-methods-use-this
  afterElement(stream) {
    stream.write(VariableBinding.END);
  }
};
