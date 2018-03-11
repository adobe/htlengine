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
const OutText = require('../parser/commands/OutText');
const VariableBinding = require('../parser/commands/VariableBinding');
const Conditional = require('../parser/commands/Conditional');
const OutputVariable = require('../parser/commands/OutputVariable');
const Loop = require('../parser/commands/Loop');

const Runtime = require('./Runtime');
const ExpressionEvaluator = require('./ExpressionEvaluator');

class Block {

    constructor(loop, pc) {
        this.loop = loop;
        this.pc = pc;
    }
}

module.exports = class InterpretingCommandVisitor {

    constructor() {
        this._result = '';
        this._runtime = new Runtime();
        this._condition = [];
        this._blocks = [];
        this._commands = [];
    }

    withRuntime(runtime) {
        this._runtime = runtime;
        return this;
    }
    withCommands(commands) {
        this._commands = commands;
        return this;
    }

    run() {
        this._run();
        return this;
    }

    get result() {
        return this._result;
    }

    _isSuspended() {
        return this._condition.length > 0 && !this._condition[this._condition.length-1];
    }

    _run() {
        this._pc = 0;
        while (this._pc < this._commands.length) {
            this._process(this._commands[this._pc]);
            this._pc++;
        }
    }

    _process(cmd) {
        if (cmd instanceof OutText) {
            if (this._isSuspended()) {
                return;
            }
            this._result += cmd.text;
        }
        else if (cmd instanceof VariableBinding.Start) {
            if (this._isSuspended()) {
                return;
            }
            const scope = this._runtime.openScope();
            const exp = new ExpressionEvaluator(scope).evaluate(cmd.expression);
            scope.setVariable(cmd.variableName, exp);
        }
        else if (cmd instanceof VariableBinding.End) {
            if (this._isSuspended()) {
                return;
            }
            this._runtime.closeScope();
        }
        else if (cmd instanceof VariableBinding.Global) {
            if (this._isSuspended()) {
                return;
            }
            const exp = new ExpressionEvaluator(this._runtime.scope).evaluate(cmd.expression);
            this._runtime.global.setVariable(cmd.variableName, exp);
        }
        else if (cmd instanceof Conditional.Start) {
            if (this._isSuspended()) {
                this._condition.push(false);
                return;
            }
            const scope = this._runtime.scope;
            const value = new ExpressionEvaluator(scope).evaluate(cmd.expression);
            const boolValue = Array.isArray(value) ? value.length > 0 : !!value;
            if (cmd.negate) {
                this._condition.push(!boolValue);
            } else {
                this._condition.push(boolValue);
            }
        }
        else if (cmd instanceof Conditional.End) {
            this._condition.pop();
        }
        else if (cmd instanceof OutputVariable) {
            if (this._isSuspended()) {
                return;
            }
            const value = this._runtime.scope.getVariable(cmd.variableName);
            if (value) {
                this._result += value;
            }
        }
        else if (cmd instanceof Loop.Start) {
            if (this._isSuspended()) {
                return;
            }
            this._blocks.push(new Block(cmd, this._pc));
            const scope = this._runtime.scope;
            let list = scope.getVariable(cmd.listVariable);
            if (!Array.isArray(list)) {
                list = Object.keys(list);
            }
            let idx = scope.getVariable(cmd.indexVariable);
            if (!idx) {
                idx = 0;
                scope.setVariable(cmd.indexVariable, idx);
                scope.setVariable(cmd.itemVariable, list[idx]);
            }
        }
        else if (cmd instanceof Loop.End) {
            if (this._isSuspended()) {
                return;
            }
            const blk = this._blocks.pop();
            const loop = blk.loop;
            const scope = this._runtime.scope;
            let list = scope.getVariable(loop.listVariable);
            if (!Array.isArray(list)) {
                list = Object.keys(list);
            }
            let idx = scope.getVariable(loop.indexVariable);
            idx++;
            scope.setVariable(loop.indexVariable, idx);
            if (idx < list.length) {
                scope.setVariable(loop.itemVariable, list[idx]);
                this._pc = blk.pc;
                this._blocks.push(blk);
            }
        }

    }
};

