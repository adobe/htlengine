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
const FunctionCall = require('../parser/commands/FunctionCall');
const Conditional = require('../parser/commands/Conditional');
const Loop = require('../parser/commands/Loop');
const OutputVariable = require('../parser/commands/OutputVariable');
const CreateElement = require('../parser/commands/CreateElement');
const PushElement = require('../parser/commands/PushElement');
const PopElement = require('../parser/commands/PopElement');
const Doctype = require('../parser/commands/Doctype');
const Comment = require('../parser/commands/Comment');
const AddAttribute = require('../parser/commands/AddAttribute');
const ExpressionFormatter = require('./ExpressionFormatter');
const DomHandler = require('./DomHandler');

module.exports = class JSCodeGenVisitor {
  constructor() {
    this._result = '';
    this._templates = '';
    this._indentLevel = 0;
    this._lastIndentLevel = 0;
    this._inFunctionBlock = false;
    this._indents = [];
    this._codeLine = 0;
    this._templateLine = 0;
    this._dom = new DomHandler(this);
  }

  withIndent(delim) {
    this._indents = [delim];
    this._indent = delim;
    for (let i = 0; i < 50; i += 1) {
      this._indents[i + 1] = this._indents[i] + delim;
    }
    return this;
  }

  withSourceMap(enabled) {
    this._mappings = enabled ? [] : null;

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
    this._dom.beginDocument();
    commands.forEach((c) => {
      c.accept(this);
    });
    this._dom.endDocument();
    return this;
  }

  out(msg) {
    if (this._indent) {
      if (this._inFunctionBlock) {
        this._templates += `${this._indent + msg}\n`;
        this._templateLine += 1;
      } else {
        this._result += `${this._indent + msg}\n`;
        this._codeLine += 1;
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

  get mappings() {
    return this._mappings;
  }

  _addMapping(location) {
    if (!location) {
      return;
    }
    const lastmapping = this._mappings[this._mappings.length - 1];
    if (lastmapping && lastmapping.originalLine === location.line) {
      // skip multiple mappings for the same original line, as
      // IDEs wouldn't probably know how to distinguish them
      return;
    }
    this._mappings.push({
      inFunctionBlock: this._inFunctionBlock,
      originalLine: location.line,
      originalColumn: location.column,
      generatedLine: this._inFunctionBlock ? this._templateLine : this._codeLine,
      generatedColumn: 0,
    });
  }

  visit(cmd) {
    if (this._mappings) {
      this._addMapping(cmd.location);
    }

    if (cmd instanceof OutText) {
      this._dom.outText(cmd);
    } else if (cmd instanceof VariableBinding.Start) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this.out(`const ${cmd.variableName} = ${exp};`);
    } else if (cmd instanceof VariableBinding.Global) {
      const exp = ExpressionFormatter.format(cmd.expression);
      this.out(`const ${ExpressionFormatter.escapeVariable(cmd.variableName)} = ${exp};`);
    } else if (cmd instanceof VariableBinding.End) {
      // nop
    } else if (cmd instanceof FunctionBlock.Start) {
      if (this._inFunctionBlock) {
        throw new Error('Template cannot be defined in another template');
      }
      this._inFunctionBlock = true;
      this._lastIndentLevel = this._indentLevel;
      this.setIndent(0);
      this._dom.functionStart(cmd);
    } else if (cmd instanceof FunctionBlock.End) {
      this._dom.functionEnd(cmd);
      this._inFunctionBlock = false;
      this.setIndent(this._lastIndentLevel);
    } else if (cmd instanceof FunctionCall) {
      this._dom.functionCall(cmd);
    } else if (cmd instanceof Conditional.Start) {
      const exp = ExpressionFormatter.format(cmd.expression);
      const neg = cmd.negate ? '!' : '';
      this.out(`if (${neg}${exp}) {`);
      this.indent();
    } else if (cmd instanceof Conditional.End) {
      this.outdent();
      this.out('}');
    } else if (cmd instanceof OutputVariable) {
      this._dom.outVariable(cmd.variableName);
    } else if (cmd instanceof Loop.Start) {
      this.out(`for (const ${cmd.indexVariable} of Object.keys(${cmd.listVariable})) {`);
      this.indent();
      this.out(`const ${cmd.itemVariable} = Array.isArray(${cmd.listVariable}) ? ${cmd.listVariable}[${cmd.indexVariable}] : ${cmd.indexVariable};`);
    } else if (cmd instanceof Loop.End) {
      this.outdent();
      this.out('}');
    } else if (cmd instanceof CreateElement) {
      this._dom.createElement(cmd);
    } else if (cmd instanceof PushElement) {
      this._dom.pushElement(cmd);
    } else if (cmd instanceof PopElement) {
      this._dom.popElement(cmd);
    } else if (cmd instanceof AddAttribute) {
      this._dom.addAttribute(cmd);
    } else if (cmd instanceof Doctype) {
      this._dom.doctype(cmd);
    } else if (cmd instanceof Comment) {
      this._dom.comment(cmd);
    } else {
      throw new Error(`unknown command: ${cmd}`);
    }
  }
};
