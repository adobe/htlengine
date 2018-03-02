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

const ExpressionContext = require('../html/ExpressionContext');
const RuntimeCall = require('./nodes/RuntimeCall');

const OPTIONS = [
    {
        fn: 'join',
        options: ['join'],
        condition: (expContext) =>
               expContext !== ExpressionContext.PLUGIN_DATA_SLY_USE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_TEMPLATE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_CALL
    }
];


/**
 * A filter is a transformation which performs modifications on expressions. Unlike plugins, filters are always applied on an expression.
 * Whether the filter transformation is actually necessary is decided by the filter. The application order of filters is given by filter
 * priority.
 */
class OptionHandler {

    apply(expression, expressionContext) {
        OPTIONS.forEach(opt => {
            if (expression.containsSomeOption(opt.options) && opt.condition(expressionContext)) {
                const args = {};
                opt.options.forEach(k => {
                    args[k] = expression.removeOption(k);
                });
                const translation = new RuntimeCall(opt.fn, expression.root, args);
                expression = expression.withNode(translation);
            }
        });
        return expression;
    }

    getFilterOptions(expression, options) {
        const result = {};
        Array.prototype.slice.call(arguments, 1).forEach(option => {
            const optionNode = expression.removeOption(option);
            if (optionNode != null) {
                result[option] = optionNode;
            }
        });
        return result;
    }

}

module.exports = OptionHandler;
module.exports.INSTANCE = new OptionHandler();