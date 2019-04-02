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

const ExpressionContext = require('../html/ExpressionContext');
const RuntimeCall = require('./nodes/RuntimeCall');
const MapLiteral = require('./nodes/MapLiteral');

const OPTIONS = [
  {
    fn: 'join',
    options: ['join'],
    asArguments: true,
    condition: expContext => expContext !== ExpressionContext.PLUGIN_DATA_SLY_USE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_TEMPLATE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_CALL,
  }, {
    fn: 'format',
    options: ['format'],
    asArguments: true,
    condition: expContext => expContext !== ExpressionContext.PLUGIN_DATA_SLY_USE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_TEMPLATE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_CALL,
  }, {
    fn: 'uriManipulation',
    options: ['scheme', 'domain', 'path', 'appendPath', 'prependPath', 'selectors', 'addSelectors', 'removeSelectors',
      'extension', 'suffix', 'prependSuffix', 'appendSuffix', 'fragment', 'query', 'addQuery', 'removeQuery'],
    asArguments: false,
    condition: expContext => expContext !== ExpressionContext.PLUGIN_DATA_SLY_USE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_TEMPLATE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_CALL,
  }, {
    fn: 'xss',
    options: ['context'],
    asArguments: true,
    condition: expContext => expContext !== ExpressionContext.PLUGIN_DATA_SLY_USE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_TEMPLATE
            && expContext !== ExpressionContext.PLUGIN_DATA_SLY_CALL,
  },
];

/**
 * A filter is a transformation which performs modifications on expressions. Unlike plugins, filters
 * are always applied on an expression. Whether the filter transformation is actually necessary is
 * decided by the filter. The application order of filters is given by filter priority.
 */
class OptionHandler {
  static filter(expression, expressionContext) {
    let expr = expression;
    OPTIONS.forEach((opt) => {
      if (expr.containsSomeOption(opt.options) && opt.condition(expressionContext)) {
        const args = [];
        if (!opt.asArguments) {
          args.push({});
        }
        opt.options.forEach((k) => {
          if (expr.containsOption(k)) {
            if (opt.asArguments) {
              args.push(expr.removeOption(k));
            } else {
              args[0][k] = expr.removeOption(k);
            }
          }
        });
        if (!opt.asArguments) {
          args[0] = new MapLiteral(args[0]);
        }
        const translation = new RuntimeCall(opt.fn, expr.root, args);
        expr = expr.withNode(translation);
      }
    });
    return expr;
  }
}

module.exports = OptionHandler;
