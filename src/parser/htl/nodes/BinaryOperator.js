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
     * Logical conjunction.
     */
  AND: {
    sym: '&&',
    calc: (left, right) => (left ? right : left),
  },

  /**
     * Logical disjunction.
     */
  OR: {
    sym: '||',
    calc: (left, right) => left || right,
  },

  /**
     * String concatenation.
     */
  CONCATENATE: {
    sym: '+',
    calc: (left, right) => String(left).concat(right),
  },

  /**
     * Less than.
     */
  LT: {
    sym: '<',
    calc: (left, right) => left < right,
  },

  /**
     * Less or equal.
     */
  LEQ: {
    sym: '<=',
    calc: (left, right) => left <= right,
  },

  /**
     * Greater than.
     */
  GT: {
    sym: '>',
    calc: (left, right) => left > right,
  },

  /**
     * Greater or equal.
     */
  GEQ: {
    sym: '>=',
    calc: (left, right) => left >= right,
  },

  /**
     * Equal.
     */
  EQ: {
    sym: '==',
    calc: (left, right) =>
      // eslint-disable-next-line implicit-arrow-linebreak,eqeqeq
      left == right,
  },

  /**
     * Not equal.
     */
  NEQ: {
    sym: '!=',
    calc: (left, right) =>
      // eslint-disable-next-line eqeqeq,implicit-arrow-linebreak
      left != right,
  },

  /**
     * Strict version of equality, restricted to just some types.
     */
  STRICT_EQ: {
    sym: '===',
    calc: (left, right) => left === right,
  },

  /**
     * Strict version of the not-equal operator.
     */
  STRICT_NEQ: {
    sym: '!==',
    calc: (left, right) => left !== right,
  },

  /**
     * Addition.
     */
  ADD: {
    sym: '+',
    isNumeric: true,
    calc: (left, right) => Number(left) + Number(right),
  },

  /**
     * Difference.
     */
  SUB: {
    sym: '-',
    isNumeric: true,
    calc: (left, right) => Number(left) - Number(right),
  },

  /**
     * Multiplication.
     */
  MUL: {
    sym: '*',
    isNumeric: true,
    calc: (left, right) => Number(left) * Number(right),
  },

  /**
     * Floating point division.
     */
  DIV: {
    sym: '/',
    isNumeric: true,
    calc: (left, right) => Number(left) / Number(right),
  },

  /**
     * Integer division.
     */
  I_DIV: {
    sym: '/',
    isNumeric: true,
    calc: (left, right) => Math.floor(Number.parseInt(left, 10) / Number.parseInt(right, 10)),
  },

  /**
     * Reminder.
     */
  REM: {
    sym: '%',
    isNumeric: true,
    calc: (left, right) => Number(left) % Number(right),

  },
});
