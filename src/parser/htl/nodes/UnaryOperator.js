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

/**
 * Binary operators used in expressions.
 */
module.exports = Object.freeze({

  /**
     * Evaluates the logical negation of the operand
     */
  NOT: {
    sym: '!',
    calc: (operand) => {
      if (Array.isArray(operand)) {
        return !operand.length;
      }
      return !operand;
    },
  },

  /**
     * Evaluates whether the operand is a string of only whitespace characters
     */
  IS_WHITESPACE: {
    sym: 'ws:',
    calc: (operand) => String(operand).trim().length === 0,
  },

  /**
     * Evaluates the length of a collection
     */
  LENGTH: {
    sym: 'len:',
    calc: (operand) => {
      if (Array.isArray(operand)) {
        return operand.length;
      }
      if (operand.length && (typeof operand.length === 'function')) {
        return operand.length();
      }
      return -1;
    },
  },

  /**
     * Evaluates if a value is empty
     */
  IS_EMPTY: {
    sym: 'emp:',
    calc: (operand) => {
      if (Array.isArray(operand)) {
        return operand.length === 0;
      }
      if (operand.length && (typeof operand.length === 'function')) {
        return operand.length() === 0;
      }
      return !`${operand}`;
    },
  },

});
