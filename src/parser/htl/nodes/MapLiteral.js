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

const ExpressionNode = require('./ExpressionNode');

module.exports = class MapLiteral extends ExpressionNode {
  constructor(map) {
    super();
    this._map = map;
  }

  /**
     * Returns an {@link ExpressionNode} from the backing map.
     *
     * @param {String} key the key under which the node is stored
     * @return {ExpressionNode} the node, if one is stored under that key; {@code null} otherwise
     */
  getValue(key) {
    return this._map[key];
  }

  /**
     * Checks if the map contains the property identified by the passed property name.
     *
     * @param {String} name the property name
     * @return {@code true} if the map contains the property, {@code false} otherwise
     */
  containsKey(name) {
    return name in this._map;
  }

  get map() {
    return this._map;
  }
};
