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

const OutText = require('../parser/commands/OutText');
const VariableBinding = require('../parser/commands/VariableBinding');
const FunctionBlock = require('../parser/commands/FunctionBlock');
const Conditional = require('../parser/commands/Conditional');
const Loop = require('../parser/commands/Loop');
const Comment = require('../parser/commands/Comment');
const OutputVariable = require('../parser/commands/OutputVariable');
const OutputExpression = require('../parser/commands/OutputExpression');
const ExpressionFormatter = require('./ExpressionFormatter');

function escapeJavaString(s) {
  return JSON.stringify(s);
}

module.exports = class JSCodeGenVitor {
  constructor() {
    this._result = '';
    this._templates = '';
    this._indentLevel = 0;
    this._lastIndentLevel = 0;
    this._inFunctionBlock = false;
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

  setIndent(n) {
    this._indentLevel = n;
    this._indent = this._indents[n] || '';
    return this;
  }

  process(commands) {
    const definedVariables = [];

    // first define the globals so they are accessible from any block below
    commands.forEach((c) => {
      if (c instanceof VariableBinding.Global) {
        this._out(`let ${c.variableName};`);
      } else if (c instanceof FunctionBlock.Start) {
        // Prevent the variable from being re-defined
        if (definedVariables.includes(c.expression) === false) {
          this._out(`let ${c.expression} = '${c.expression}';`);
          definedVariables.push(c.expression);
        }
      }
    });

    commands.forEach((c) => {
      c.accept(this);
    });
    return this;
  }

  _out(msg) {
    if (this._indent) {
      if (this._inFunctionBlock) {
        this._templates += `${this._indent + msg}\n`;
      } else {
        this._result += `${this._indent + msg}\n`;
      }
    } else if (this._inFunctionBlock) {
      this._templates += msg;
    } else {
      this._result += msg;
    }
  }

  get code() {
    return this._result;
  }

  get templates() {
    return this._templates;
  }

  visit(cmd) {
    if (cmd instanceof OutText) {
      this._out(`out(${escapeJavaString(cmd.text)});`);
    } else if (cmd instanceof OutputExpression) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this._out(`${exp};`);
    } else if (cmd instanceof VariableBinding.Start) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this._out(`const ${cmd.variableName} = ${exp};`);
    } else if (cmd instanceof VariableBinding.Global) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this._out(`${cmd.variableName} = ${exp};`);
    } else if (cmd instanceof VariableBinding.End) {
      // nop
    } else if (cmd instanceof FunctionBlock.Start) {
      if (this._inFunctionBlock) {
        throw new Error('Template cannot be defined in another template');
      }

      this._inFunctionBlock = true;
      this._lastIndentLevel = this._indentLevel;
      this.setIndent(0);

      const exp = ExpressionFormatter.format(cmd.expression);
      const functionName = `_template_${exp}`;
      this._out(`template('${exp}', function* ${functionName}() {`);
      this.indent();

      cmd.arguments.forEach((arg) => {
        this._out(`const ${arg} = arguments[0]['${arg}'] || '';`);
      });
    } else if (cmd instanceof FunctionBlock.End) {
      this.outdent();
      this._out('});');
      this._inFunctionBlock = false;
      this.setIndent(this._lastIndentLevel);
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

