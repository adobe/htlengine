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
const OutText = require('./OutText');
const VariableBinding = require('./VariableBinding');
const Conditional = require('./Conditional');
const Loop = require('./Loop');
const OutputVariable = require('./OutputVariable');
const ExpressionFormatter = require('../../compiler/ExpressionFormatter');

function escapeJavaString(s) {
    return JSON.stringify(s);
}

const INDENTS = [''];
for (let i=0; i < 50; i++) {
    INDENTS[i + 1] = INDENTS[i] + '  ';
}

module.exports = class DebugCommandVisitor {

    constructor() {
        this._result = '';
        this._indent = 0;
    }

    out(msg) {
        this._result += INDENTS[this._indent] + msg + '\n';
    }

    get result() {
        return this._result;
    }

    visit(cmd) {
        if (cmd instanceof OutText) {
            this.out(`out(${escapeJavaString(cmd.text)});`);
        }

        else if (cmd instanceof VariableBinding.Start) {
            const exp = ExpressionFormatter.format(cmd.expression);
            this.out(`{ const ${cmd.variableName} = ${exp};`);
            this._indent++;
        }
        else if (cmd instanceof VariableBinding.Global) {
            const exp = ExpressionFormatter.format(cmd.expression);
            this.out(`global.${cmd.variableName} = ${exp};`);
        }
        else if (cmd instanceof VariableBinding.End) {
            this._indent--;
            this.out('}');
        }
        else if (cmd instanceof Conditional.Start) {
            const exp = ExpressionFormatter.format(cmd.expression);
            const neg = cmd.negate ? '!' : '';
            this.out(`if (${neg}${exp}) {`);
            this._indent++;
        }
        else if (cmd instanceof Conditional.End) {
            this._indent--;
            this.out('}');
        }
        else if (cmd instanceof OutputVariable) {
            this.out(`out(${cmd.variableName});`);
        }
        else if (cmd instanceof Loop.Start) {
            this.out(`for ((${cmd.indexVariable},${cmd.itemVariable}) in ${cmd.listVariable}) {`);
            this._indent++;
        }
        else if (cmd instanceof Loop.End) {
            this._indent--;
            this.out('}');
        }
        else {
            throw new Error('unknown command: ' + cmd);
        }

    }
};

