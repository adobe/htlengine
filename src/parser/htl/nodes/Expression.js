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
module.exports = class Expression {
  /**
     *
     * @param {ExpressionNode} root Root node
     * @param {Map<String, ExpressionNode>} options Options
     * @param {String} rawText Raw text
     */
  constructor(root, options, rawText) {
    this._options = options || {};
    this._root = root;
    this._rawText = rawText;
  }

  get root() {
    return this._root;
  }

  get options() {
    return this._options;
  }

  get rawText() {
    return this._rawText;
  }

  withRawText(rawText) {
    return new Expression(this._root, this._options, rawText);
  }

  withNode(node) {
    return new Expression(node, this._options, null);
  }

  containsOption(option) {
    return option in this._options;
  }

  containsSomeOption(options) {
    return options.some(opt => opt in this._options);
  }

  /**
     * Removes the given option from this expression.
     *
     * @param {String} option the option to be removed
     * @return the option, or {@code null} if the option doesn't exist
     */
  removeOption(option) {
    const ret = this._options[option];
    delete this._options[option];
    return ret;
  }

  accept(visitor) {
    return visitor.visit(this);
  }
};
