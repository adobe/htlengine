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

const NullLiteral = require('../parser/htl/nodes/NullLiteral');
const ArrayLiteral = require('../parser/htl/nodes/ArrayLiteral');
const MapLiteral = require('../parser/htl/nodes/MapLiteral');
const NumericConstant = require('../parser/htl/nodes/NumericConstant');
const StringConstant = require('../parser/htl/nodes/StringConstant');
const BooleanConstant = require('../parser/htl/nodes/BooleanConstant');
const PropertyAccess = require('../parser/htl/nodes/PropertyAccess');
const Expression = require('../parser/htl/nodes/Expression');
const ExpressionNode = require('../parser/htl/nodes/ExpressionNode');
const Interpolation = require('../parser/htl/nodes/Interpolation');
const Identifier = require('../parser/htl/nodes/Identifier');
const BinaryOperation = require('../parser/htl/nodes/BinaryOperation');
const MultiOperation = require('../parser/htl/nodes/MultiOperation');
const UnaryOperation = require('../parser/htl/nodes/UnaryOperation');
const TernaryOperation = require('../parser/htl/nodes/TernaryOperation');
const RuntimeCall = require('../parser/htl/nodes/RuntimeCall');
const Runtime = require('../runtime/Runtime');

module.exports = class ExpressionEvaluator {
  constructor(scope) {
    this._scope = scope;
    this._runtime = new Runtime();
  }

  evaluate(node) {
    return this.visit(node);
  }

  visit(node) {
    if (node instanceof Interpolation) {
      let result = '';
      node.fragments.forEach((frag) => {
        if (frag.expression) {
          result += `${frag.expression.accept(this)}`;
        } else {
          result += `${frag.text}`;
        }
      });
      return result;
    }

    if (node instanceof ArrayLiteral) {
      const result = [];
      node.items.forEach((i) => {
        result.push(i.accept(this));
      });
      return result;
    }

    if (node instanceof PropertyAccess) {
      const target = node.target.accept(this);
      const name = node.property.accept(this);
      if (target === null || target === undefined) {
        throw new Error(`Invalid property access. ${node.target._name} evaluates to null`); // eslint-disable-line no-underscore-dangle
      }
      if (!(name in target)) {
        // throw new Error(`No such property ${name} in ${node.target._name}`);
      }
      const obj = target[name];
      if (obj instanceof ExpressionNode) {
        return obj.accept(this);
      }
      return obj;
    }

    if (node instanceof BinaryOperation) {
      const op0 = node.leftOperand.accept(this);
      const op1 = node.rightOperand.accept(this);
      return node.operator.calc(op0, op1);
    }

    if (node instanceof MultiOperation) {
      let op0 = null;
      node.operands.forEach((op, idx) => {
        const op1 = op.accept(this);
        op0 = idx === 0 ? op1 : node.operator.calc(op0, op1);
      });
      return op0;
    }

    if (node instanceof TernaryOperation) {
      const cnd = node.condition.accept(this);
      const thn = node.thenBranch.accept(this);
      const els = node.elseBranch.accept(this);
      return cnd ? thn : els;
    }

    if (node instanceof UnaryOperation) {
      const op = node.target.accept(this);
      return node.operator.calc(op);
    }

    if (node instanceof Expression) {
      const result = node.root.accept(this);
      // todo:
      // Object.keys(node.options).forEach((key, idx) => {
      //     const option = node.options[key];
      //     if (idx === 0) {
      //         this._result += ' @ ';
      //     } else {
      //         this._result += ', ';
      //     }
      //     this._result += key;
      //     if (!(option instanceof NullLiteral)) {
      //         this._result += '=';
      //         option.accept(this);
      //     }
      // });
      return result;
    }

    if (node instanceof Identifier) {
      return this._scope.getVariable(node.name);
    }

    if (node instanceof RuntimeCall) {
      const args = [node.functionName];
      if (node.expression) {
        args.push(node.expression.accept(this));
      }
      node.args.forEach((arg) => {
        args.push(arg.accept(this));
      });
      return this._runtime.exec(...args);
    }

    if (node instanceof NumericConstant) {
      return node.value;
    }

    if (node instanceof StringConstant) {
      return node.text;
    }

    if (node instanceof BooleanConstant) {
      return node.value;
    }

    if (node instanceof NullLiteral) {
      return null;
    }

    if (node instanceof MapLiteral) {
      const map = {};
      Object.keys(node.map).forEach((k) => {
        map[k] = node.map[k].accept(this);
      });
      return map;
    }
    if (typeof node === 'string') {
      return node;
    }

    throw new Error(`unexpected node: ${node.constructor.name}`);
  }
};
