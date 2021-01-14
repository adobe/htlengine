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

const StringConstant = require('../htl/nodes/StringConstant');
const Expression = require('../htl/nodes/Expression');
const MultiOperation = require('../htl/nodes/MultiOperation');
const BinaryOperator = require('../htl/nodes/BinaryOperator');
const OptionHandler = require('../htl/OptionHandler');

function join(nodes) {
  if (nodes.length === 0) {
    return StringConstant.EMPTY;
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  return new MultiOperation(BinaryOperator.CONCATENATE, nodes);
}

module.exports = class ExpressionTransformer {
  transform(interpolation, markupContext, expressionContext) {
    const nodes = [];
    const /* HashMap<String, ExpressionNode> */ options = {};
    interpolation.fragments.forEach((fragment) => {
      if (fragment.type === 'text') {
        nodes.push(new StringConstant(fragment.value));
      } else {
        const xformed = this.adjustToContext(fragment, markupContext, expressionContext);
        nodes.push(xformed.root);
        Object.assign(options, xformed.options);
      }
    });

    const root = join(nodes);

    if (interpolation.fragments.length > 1 && options.context) {
      // context must not be calculated by merging
      delete options.context;
    }
    return new Expression(root, options, interpolation.content);
  }

  // eslint-disable-next-line class-methods-use-this
  adjustToContext(expression, markupContext, expressionContext) {
    const expr = expression;
    if (markupContext != null && !expr.options.context) {
      expr.options.context = new StringConstant(markupContext);
    }
    return OptionHandler.filter(expr, expressionContext);
  }
};
