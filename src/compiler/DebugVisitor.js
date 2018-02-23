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
const NullLiteral = require("./nodes/NullLiteral");
const ArrayLiteral = require("./nodes/ArrayLiteral");
const NumericConstant = require("./nodes/NumericConstant");
const StringConstant = require("./nodes/StringConstant");
const BooleanConstant = require("./nodes/BooleanConstant");
const PropertyAccess = require("./nodes/PropertyAccess");
const Expression = require("./nodes/Expression");
const Interpolation = require("./nodes/Interpolation");
const Identifier = require("./nodes/Identifier");
const BinaryOperation = require("./nodes/BinaryOperation");
const UnaryOperation = require("./nodes/UnaryOperation");
const TernaryOperation = require("./nodes/TernaryOperation");

/**
 * Visitor that recreates the parsed text and stores it in {@code result}.
 * @type {module.DebugVisitor}
 */
module.exports = class DebugVisitor {
  constructor() {
    this.result = "";
  }

  visit(node) {
    if (node.hasParens) {
      this.result += "(";
    }
    if (node instanceof Interpolation) {
      node.fragments.forEach(frag => {
        if (frag.expression) {
          frag.expression.accept(this);
        } else {
          this.result += frag.text;
        }
      });
    } else if (node instanceof ArrayLiteral) {
      this.result += "[";
      node.items.forEach((i, idx) => {
        if (idx > 0) {
          this.result += ", ";
        }
        i.accept(this);
      });
      this.result += "]";
    } else if (node instanceof PropertyAccess) {
      node.target.accept(this);
      this.result += "[";
      node.property.accept(this);
      this.result += "]";
    } else if (node instanceof BinaryOperation) {
      node.leftOperand.accept(this);
      this.result += node.operator.sym;
      node.rightOperand.accept(this);
    } else if (node instanceof TernaryOperation) {
      node.condition.accept(this);
      this.result += " ? ";
      node.thenBranch.accept(this);
      this.result += " : ";
      node.elseBranch.accept(this);
    } else if (node instanceof UnaryOperation) {
      this.result += node.operator.sym;
      node.target.accept(this);
    } else if (node instanceof Expression) {
      this.result += "${";
      node.root.accept(this);
      Object.keys(node.options).forEach((key, idx) => {
        const option = node.options[key];
        if (idx === 0) {
          this.result += " @ ";
        } else {
          this.result += ", ";
        }
        this.result += key;
        if (!(option instanceof NullLiteral)) {
          this.result += "=";
          option.accept(this);
        }
      });
      this.result += "}";
    } else if (node instanceof Identifier) {
      this.result += node.name;
    } else if (node instanceof NumericConstant) {
      this.result += node.value;
    } else if (node instanceof StringConstant) {
      this.result += "'" + node.text + "'";
    } else if (node instanceof BooleanConstant) {
      this.result += node.value;
    } else if (node instanceof NullLiteral) {
      // nop
    } else {
      throw new Error("unexpected node: " + node.constructor.name);
    }
    if (node.hasParens) {
      this.result += ")";
    }
  }
};
