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
const NullLiteral = require('../parser/htl/nodes/NullLiteral');
const ArrayLiteral = require('../parser/htl/nodes/ArrayLiteral');
const NumericConstant = require('../parser/htl/nodes/NumericConstant');
const StringConstant = require('../parser/htl/nodes/StringConstant');
const BooleanConstant = require('../parser/htl/nodes/BooleanConstant');
const PropertyAccess = require('../parser/htl/nodes/PropertyAccess');
const Expression = require('../parser/htl/nodes/Expression');
const Interpolation = require('../parser/htl/nodes/Interpolation');
const Identifier = require('../parser/htl/nodes/Identifier');
const MapLiteral = require('../parser/htl/nodes/MapLiteral');
const BinaryOperation = require('../parser/htl/nodes/BinaryOperation');
const UnaryOperation = require('../parser/htl/nodes/UnaryOperation');
const TernaryOperation = require('../parser/htl/nodes/TernaryOperation');
const RuntimeCall = require('../parser/htl/nodes/RuntimeCall');
const ExpressionNode = require('../parser/htl/nodes/ExpressionNode');

/**
 * Visitor that recreates the parsed text and stores it in {@code result}.
 * @type {module.DebugVisitor}
 */
module.exports = class ExpressionFormatter {

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
                    this.result += '' + frag.text;
                }
            });
        }
        else if (node instanceof ArrayLiteral) {
            this.result += '[';
            node.items.forEach((i, idx) => {
                if (idx > 0) {
                    this.result += ', ';
                }
                i.accept(this);
            });
            this.result += ']';
        }
        else if (node instanceof PropertyAccess) {
            node.target.accept(this);
            this.result += '[';
            node.property.accept(this);
            this.result += ']';
        }
        else if (node instanceof BinaryOperation) {
            node.leftOperand.accept(this);
            this.result += node.operator.sym;
            node.rightOperand.accept(this);
        }
        else if (node instanceof TernaryOperation) {
            node.condition.accept(this);
            this.result += ' ? ';
            node.thenBranch.accept(this);
            this.result += ' : ';
            node.elseBranch.accept(this);
        }
        else if (node instanceof UnaryOperation) {
            this.result += node.operator.sym;
            node.target.accept(this);
        }
        else if (node instanceof Expression) {
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
        }
        else if (node instanceof Identifier) {
            this.result += node.name;
        }
        else if (node instanceof NumericConstant) {
            this.result += node.value;
        }
        else if (node instanceof StringConstant) {
            this.result += JSON.stringify(node.text);
        }
        else if (node instanceof BooleanConstant) {
            this.result += node.value;
        }
        else if (node instanceof NullLiteral) {
            // nop
        }
        else if (node instanceof RuntimeCall) {
            this.result += node.functionName + '(';
            node.expression.accept(this);
            Object.keys(node.args).forEach(key => {
                this.result += `, ${key}=`;
                node.args[key].accept(this);
            });
            this.result += ')';
        }
        else if (node instanceof MapLiteral) {
            this.result += JSON.stringify(node.map);
            // this.result += '{';
            // Object.keys(node.map).forEach((key) => {
            //     this.result += key + ': ';
            //     node.map[key].accept(this);
            //     this.result += ', ';
            // });
            // this.result += '}';
        }
        else {
            throw new Error('unexpected node: ' + node.constructor.name);
        }
        if (node.hasParens) {
            this.result += ')';
        }
    }
};
