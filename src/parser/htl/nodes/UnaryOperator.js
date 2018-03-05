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
     * Evaluates the logical negation of the operand
     */
    NOT: {
        sym: '!',
        calc: (operand) => {
            if (Array.isArray(operand)) {
                return !operand.length;
            }
            return !operand;
        }
    },

    /**
     * Evaluates whether the operand is a string of only whitespace characters
     */
    IS_WHITESPACE: {
        sym: 'ws:',
        calc: (operand) => {
            return String(operand).trim().length === 0;
        }
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
            if (operand.length && (typeof operand === 'function')) {
                return operand.length();
            }
            return -1;
        }
    }

});

