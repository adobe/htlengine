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

/**
 * A filter is a transformation which performs modifications on expressions. Unlike plugins, filters are always applied on an expression.
 * Whether the filter transformation is actually necessary is decided by the filter. The application order of filters is given by filter
 * priority.
 */
module.exports = class Filter {

    /**
     * Transform the given expression
     *
     * @param {Expression} expression        the original expression
     * @param {ExpressionContext} expressionContext the expression's context
     * @return {Expression} a transformed expression. If the filter is not applicable
     * to the given expression, then the original expression shall be returned
     */
    apply(expression, expressionContext) {
        return null;
    };

    /**
     * The priority with which filters are applied. This establishes order between filters. Filters with
     * lower priority are applied first.
     *
     * @return {Number} an integer representing the filter's priority
     */
    priority() {
        return 0;
    };

    /**
     * Collects the options passed in the {@code options} array into a new map while removing them from the original expression.
     *
     * @param {Expression} expression the expression providing the options to be processed
     * @param {String...} options    the options of interest for the {@link Filter}
     * @return {*} a map with the retrieved options; the map can be empty if none of the options were found
     */
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
};