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
const NumericConstant = require('../parser/htl/nodes/NumericConstant');
const StringConstant = require('../parser/htl/nodes/StringConstant');
const BooleanConstant = require('../parser/htl/nodes/BooleanConstant');
const PropertyAccess = require('../parser/htl/nodes/PropertyAccess');
const Expression = require('../parser/htl/nodes/Expression');
const Interpolation = require('../parser/htl/nodes/Interpolation');
const Identifier = require('../parser/htl/nodes/Identifier');
const PropertyIdentifier = require('../parser/htl/nodes/PropertyIdentifier');
const MapLiteral = require('../parser/htl/nodes/MapLiteral');
const BinaryOperation = require('../parser/htl/nodes/BinaryOperation');
const MultiOperation = require('../parser/htl/nodes/MultiOperation');
const UnaryOperation = require('../parser/htl/nodes/UnaryOperation');
const UnaryOperator = require('../parser/htl/nodes/UnaryOperator');
const TernaryOperation = require('../parser/htl/nodes/TernaryOperation');
const RuntimeCall = require('../parser/htl/nodes/RuntimeCall');
const ExpressionNode = require('../parser/htl/nodes/ExpressionNode');

/**
 * Visitor that recreates the parsed text and stores it in {@code result}.
 * @type {module.DebugVisitor}
 */
module.exports = class ExpressionFormatter {
  static escapeVariable(ident) {
    return ident.replace(':', '$');
  }

  static format(expression) {
    if (expression instanceof ExpressionNode) {
      const v = new ExpressionFormatter();
      expression.accept(v);
      return v.result;
    }
    return expression;
  }

  constructor() {
    this.result = '';
  }

  visit(node) {
    if (node.hasParens) {
      this.result += '(';
    }
    if (node instanceof Interpolation) {
      node.fragments.forEach((frag) => {
        if (frag.expression) {
          frag.expression.accept(this);
        } else {
          this.result += `${frag.text}`;
        }
      });
    } else if (node instanceof ArrayLiteral) {
      this.result += '[';
      node.items.forEach((i, idx) => {
        if (idx > 0) {
          this.result += ', ';
        }
        i.accept(this);
      });
      this.result += ']';
    } else if (node instanceof PropertyAccess) {
      if (node.target) {
        node.target.accept(this);
      }
      const property = node.property instanceof ExpressionNode ? '' : node.property;
      if (property) {
        this.result += property;
      } else {
        this.result += '[';
        node.property.accept(this);
        this.result += ']';
      }
    } else if (node instanceof BinaryOperation) {
      const fn = node.operator.isNumeric ? 'Number' : '';
      this.result += `${fn}(`;
      node.leftOperand.accept(this);
      this.result += `) ${node.operator.sym} ${fn}(`;
      node.rightOperand.accept(this);
      this.result += ')';
    } else if (node instanceof MultiOperation) {
      const fn = node.operator.isNumeric ? 'Number' : '';
      node.operands.forEach((op, idx) => {
        if (idx > 0) {
          this.result += ` ${node.operator.sym} `;
        }
        this.result += `${fn}(`;
        op.accept(this);
        this.result += ')';
      });
    } else if (node instanceof TernaryOperation) {
      node.condition.accept(this);
      this.result += ' ? ';
      node.thenBranch.accept(this);
      this.result += ' : ';
      node.elseBranch.accept(this);
    } else if (node instanceof UnaryOperation) {
      if (node.operator === UnaryOperator.LENGTH) {
        this.result += '$.lengthOf(';
        node.target.accept(this);
        this.result += ')';
      } else if (node.operator === UnaryOperator.NOT && node.target instanceof ArrayLiteral) {
        this.result += '!';
        node.target.accept(this);
        this.result += '.length';
      } else {
        this.result += node.operator.sym;
        node.target.accept(this);
      }
    } else if (node instanceof Expression) {
      this.result += '${';
      node.root.accept(this);
      Object.keys(node.options).forEach((key, idx) => {
        const option = node.options[key];
        if (idx === 0) {
          this.result += ' @ ';
        } else {
          this.result += ', ';
        }
        this.result += key;
        if (!(option instanceof NullLiteral)) {
          this.result += '=';
          option.accept(this);
        }
      });
      this.result += '}';
    } else if (node instanceof PropertyIdentifier) {
      this.result += ExpressionFormatter.escapeVariable(node.name);
    } else if (node instanceof Identifier) {
      this.result += ExpressionFormatter.escapeVariable(node.name);
    } else if (node instanceof NumericConstant) {
      this.result += node.value;
    } else if (node instanceof StringConstant) {
      this.result += JSON.stringify(node.text);
    } else if (node instanceof BooleanConstant) {
      this.result += node.value;
    } else if (node instanceof NullLiteral) {
      this.result += 'null';
    } else if (node instanceof RuntimeCall) {
      // special handling for xss. todo: make more generic
      let delim = '';
      if (node.functionName === 'xss' || node.functionName === 'listInfo') {
        this.result += `$.${node.functionName}(`;
      } else if (node.functionName === 'use') {
        this.result += 'yield $.use(';
      } else if (node.functionName === 'call') {
        this.result += 'yield $.call($.template().';
      } else if (node.functionName === 'resource') {
        this.result += 'yield $.slyResource(';
      } else {
        this.result += `$.exec("${node.functionName}"`;
        delim = ', ';
      }
      if (node.expression) {
        this.result += delim;
        node.expression.accept(this);
        delim = ', ';
      }
      node.args.forEach((arg) => {
        this.result += delim;
        arg.accept(this);
        delim = ', ';
      });
      this.result += ')';
    } else if (node instanceof MapLiteral) {
      this.result += '{';
      Object.keys(node.map).forEach((key) => {
        this.result += `"${key}": `;
        node.map[key].accept(this);
        this.result += ', ';
      });
      this.result += '}';
    } else {
      throw new Error(`unexpected node: ${node.constructor.name}`);
    }
    if (node.hasParens) {
      this.result += ')';
    }
  }
};
