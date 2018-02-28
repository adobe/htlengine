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

const StringConstant = require('../htl/nodes/StringConstant');
const Expression = require('../htl/nodes/Expression');
const BinaryOperation = require('../htl/nodes/BinaryOperation');
const BinaryOperator = require('../htl/nodes/BinaryOperator');

function _join(nodes) {
    if (nodes.length === 0) {
        return StringConstant.EMPTY;
    }
    let root = nodes[0];
    for (let i = 1; i< nodes.length; i++) {
        root = new BinaryOperation(BinaryOperator.CONCATENATE, root, nodes[i]);
    }
    return root;
}

module.exports = class ExpressionTransformer {

    constructor() {
        this._filters = [];
    }

    withFilter(filter) {
        this._filters.push(filter);
        return this;
    }

    transform(interpolation, markupContext, expressionContext) {
        const nodes = [];
        const /*HashMap<String, ExpressionNode>*/ options = {};
        interpolation.fragments.forEach(fragment => {
            if (fragment.text) {
                nodes.push(new StringConstant(fragment.text));
            } else {
                const transformed = this.adjustToContext(fragment.expression, markupContext, expressionContext);
                nodes.push(transformed.root);
                Object.assign(options, transformed.options);
            }
        });

        const root = _join(nodes);

        if (interpolation.length > 1 && options['context']) {
            //context must not be calculated by merging
            delete options['context'];
        }
        return new Expression(root, options, interpolation.content);
    }

    _applyFilters(expression, expressionContext) {
        return this._filters.reduce((p, filter) => filter.apply(p, expressionContext), expression);
    }


    adjustToContext(expression, markupContext, expressionContext) {
        if (markupContext != null && !expression.options['context']) {
            expression.options['context'] = new StringConstant(markupContext);
        }
        return this._applyFilters(expression, expressionContext);
    }

};
