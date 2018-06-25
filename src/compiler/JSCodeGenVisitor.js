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
const Loop = require('../parser/commands/Loop');
const Comment = require('../parser/commands/Comment');
const OutputVariable = require('../parser/commands/OutputVariable');
const ExpressionFormatter = require('./ExpressionFormatter');

function escapeJavaString(s) {
  return JSON.stringify(s);
}

module.exports = class JSCodeGenVitor {
  constructor() {
    this._result = '';
    this._indentLevel = 0;
    this._indents = [];
  }

  withIndent(delim) {
    this._indents = [delim];
    this._indent = delim;
    for (let i = 0; i < 50; i += 1) {
      this._indents[i + 1] = this._indents[i] + delim;
    }
    return this;
  }

  indent() {
    this._indent = this._indents[++this._indentLevel] || ''; // eslint-disable-line no-plusplus
    return this;
  }
  outdent() {
    this._indent = this._indents[--this._indentLevel] || ''; // eslint-disable-line no-plusplus
    return this;
  }

  process(commands) {
    // first define the globals so they are accessible from any block below
    commands.forEach((c) => {
      if (c instanceof VariableBinding.Global) {
        this._out(`let ${c.variableName};`);
      }
    });

    commands.forEach((c) => {
      c.accept(this);
    });
    return this;
  }

  _out(msg) {
    if (this._indent) {
      this._result += `${this._indent + msg}\n`;
    } else {
      this._result += msg;
    }
  }

  get code() {
    return this._result;
  }

  visit(cmd) {
    if (cmd instanceof OutText) {
      this._out(`out(${escapeJavaString(cmd.text)});`);
    } else if (cmd instanceof VariableBinding.Start) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this._out(`const ${cmd.variableName} = ${exp};`);
    } else if (cmd instanceof VariableBinding.Global) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this._out(`${cmd.variableName} = ${exp};`);
    } else if (cmd instanceof VariableBinding.End) {
      // nop
    } else if (cmd instanceof Conditional.Start) {
      const exp = ExpressionFormatter.format(cmd.expression);
      const neg = cmd.negate ? '!' : '';
      this._out(`if (${neg}${exp}) {`);
      this.indent();
    } else if (cmd instanceof Conditional.End) {
      this.outdent();
      this._out('}');
    } else if (cmd instanceof OutputVariable) {
      this._out(`out(${cmd.variableName});`);
    } else if (cmd instanceof Loop.Start) {
      // this._out(`for (${cmd.indexVariable},${cmd.itemVariable}) in ${cmd.listVariable}) {`);
      this._out(`for (const ${cmd.indexVariable} of Object.keys(${cmd.listVariable})) {`);
      this.indent();
      this._out(`const ${cmd.itemVariable} = Array.isArray(${cmd.listVariable}) ? ${cmd.listVariable}[${cmd.indexVariable}] : ${cmd.indexVariable};`);
    } else if (cmd instanceof Loop.End) {
      this.outdent();
      this._out('}');
    } else if (cmd instanceof Comment) {
      this._out(`/* ${cmd.text} */`);
    } else {
      throw new Error(`unknown command: ${cmd}`);
    }
  }
};

