/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const NullLiteral = require('../htl/nodes/NullLiteral');
const ArrayLiteral = require('../htl/nodes/ArrayLiteral');
const NumericConstant = require('../htl/nodes/NumericConstant');
const StringConstant = require('../htl/nodes/StringConstant');
const BooleanConstant = require('../htl/nodes/BooleanConstant');
const PropertyAccess = require('../htl/nodes/PropertyAccess');
const Expression = require('../htl/nodes/Expression');
const Interpolation = require('../htl/nodes/Interpolation');
const PropertyIdentifier = require('../htl/nodes/PropertyIdentifier');
const BinaryOperator = require('../htl/nodes/BinaryOperator');
const BinaryOperation = require('../htl/nodes/BinaryOperation');
const UnaryOperator = require('../htl/nodes/UnaryOperator');
const UnaryOperation = require('../htl/nodes/UnaryOperation');
const TernaryOperation = require('../htl/nodes/TernaryOperation');

module.exports = {

  binaryOps: BinaryOperator,

  unaryOps: UnaryOperator,

  interpolation(frags) {
    const node = new Interpolation();
    frags.forEach(([frag]) => {
      if (typeof frag === 'string') {
        node.addText(frag);
      } else {
        node.addExpression(frag);
      }
    });
    return node;
  },

  expression(node, options) {
    return new Expression(node || NullLiteral.INSTANCE, options);
  },

  options(kvs) {
    const opts = {};
    kvs.forEach(([key, value]) => {
      opts[key] = value || NullLiteral.INSTANCE;
    });
    return opts;
  },

  ternary(cond, a0, a1) {
    return new TernaryOperation(cond, a0, a1);
  },

  binary(op, children) {
    if (children.length === 1) {
      return children[0];
    }
    return children.reduce((p, v) => new BinaryOperation(op, p, v), children.shift());
  },

  unary(op, node) {
    return new UnaryOperation(op, node);
  },

  access(node, props) {
    props.forEach((prop) => {
      // eslint-disable-next-line no-param-reassign
      node = new PropertyAccess(node, prop);
    });
    return node;
  },

  string(text) {
    return new StringConstant(text);
  },

  array(list = []) {
    return new ArrayLiteral(list);
  },

  ident(str) {
    return new PropertyIdentifier(str);
  },

  number(num) {
    return new NumericConstant(num);
  },

  bool(val) {
    return new BooleanConstant(val);
  },
};
