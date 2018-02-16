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
 * Binary operators used in expressions.
 */
module.exports = Object.freeze({

    /**
     * Logical conjunction.
     */
    AND: {
        sym: '&&',
        calc: (left, right) => {
            return Boolean(left) ? right : left;
        }
    },
    /**
     * Logical disjunction.
     */
    OR: {
        sym: '||',
        calc: (left, right) => {
            return Boolean(left) ? left : right;
        }
    },
    /**
     * String concatenation.
     */
    CONCATENATE: {
        sym: '+',
        calc: (left, right) => {
            return String(left).concat(right);
        }
    },
    /**
     * Less than.
     */
    LT: {
        sym: '<',
        calc: (left, right) => {
            return left < right;
        }
    },
    /**
     * Less or equal.
     */
    LEQ: {
        sym: '<=',
        calc: (left, right) => {
            return left <= right;
        }
    },
    /**
     * Greater than.
     */
    GT: {
        sym: '>',
        calc: (left, right) => {
            return left > right;
        }
    },
    /**
     * Greater or equal.
     */
    GEQ: {
        sym: '>=',
        calc: (left, right) => {
            return left >= right;
        }
    },
    /**
     * Equal.
     */
    EQ: {
        sym: '==',
        calc: (left, right) => {
            // noinspection EqualityComparisonWithCoercionJS
            return left == right;
        }
    },
    /**
     * Not equal.
     */
    NEQ: {
        sym: '!=',
        calc: (left, right) => {
            // noinspection EqualityComparisonWithCoercionJS
            return left != right;
        }

    },
    /**
     * Strict version of equality, restricted to just some types.
     */
    STRICT_EQ: {
        sym: '==',
        calc: (left, right) => {
            return left === right;
        }
    },
    /**
     * Strict version of the not-equal operator.
     */
    STRICT_NEQ: {
        sym: '!=',
        calc: (left, right) => {
            return left !== right;
        }
    },
    /**
     * Addition.
     */
    ADD: {
        sym: '+',
        calc: (left, right) => {
            return Number(left) + Number(right);
        }
    },

    /**
     * Difference.
     */
    SUB: {
        sym: '-',
        calc: (left, right) => {
            return Number(left) - Number(right);
        }
    },
    /**
     * Multiplication.
     */
    MUL: {
        sym: '*',
        calc: (left, right) => {
            return Number(left) * Number(right);
        }
    },
    /**
     * Floating point division.
     */
    DIV: {
        sym: '/',
        calc: (left, right) => {
            return Number(left) / Number(right);
        }
    },
    /**
     * Integer division.
     */
    I_DIV: {
        sym: '/',
        calc: (left, right) => {
            return Math.floor(Number.parseInt(left) / Number.parseInt(right));
        }
    },

    /**
     * Reminder.
     */
    REM: {
        sym: '%',
        calc: (left, right) => {
            return Number(left) % Number(right);
        }

    }

});

