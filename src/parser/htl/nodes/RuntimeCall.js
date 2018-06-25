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
const ExpressionNode = require('./ExpressionNode');

/**
 * A {@code RuntimeCall} is a special expression which provides access to utility functions from the
 * runtime.
 */
module.exports = class RuntimeCall extends ExpressionNode {
  /**
   * Creates a {@code RuntimeCall} based on a {@code functionName} and an array
   * of {@code arguments}.
   *
   * @param {String} functionName the name of the function identifying the runtime call
   * @param {ExpressionNode} expression the node this call is applied on
   * @param {ExpressionNode...} args  the arguments passed to the runtime call
   */
  constructor(functionName, expression, args) {
    super();
    this._functionName = functionName;
    this._expression = expression;
    this._args = args || [];
  }

  get functionName() {
    return this._functionName;
  }

  get expression() {
    return this._expression;
  }

  get args() {
    return this._args;
  }
};
