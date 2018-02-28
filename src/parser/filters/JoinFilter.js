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

const Filter = require('./Filter');
const ExpressionContext = require('../html/ExpressionContext');
const RuntimeCall = require('../htl/nodes/RuntimeCall');

const JOIN_OPTION = 'join';

class JoinFilter extends Filter {

    apply(expression, expressionContext) {
        if (!expression.containsOption(JOIN_OPTION)
            || expressionContext === ExpressionContext.PLUGIN_DATA_SLY_USE
            || expressionContext === ExpressionContext.PLUGIN_DATA_SLY_TEMPLATE
            || expressionContext === ExpressionContext.PLUGIN_DATA_SLY_CALL) {
            return expression;
        }
        const translation =
        new RuntimeCall('join', expression.root, expression.removeOption(JOIN_OPTION));
        return expression.withNode(translation);
    }

}

module.exports = JoinFilter;
module.exports.INSTANCE = new JoinFilter();