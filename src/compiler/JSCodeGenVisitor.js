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
const FileReference = require('../parser/commands/FileReference');
const FunctionBlock = require('../parser/commands/FunctionBlock');
const ExternalCode = require('../parser/commands/ExternalCode');
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
const DomHandler = require('./DomHandler');

module.exports = class JSCodeGenVisitor {
  constructor() {
    this._main = {
      line: 1,
      code: '',
      map: [],
    };
    this._blocks = [];
    this._blk = this._main;
    this._templateStack = [];
    this._sourceFile = null;
    this._indentLevel = 0;
    this._templateIndentLevel = 0;
    this._indents = [];
    this._dom = new DomHandler(this);
    this._enableSourceMaps = false;
    this._scriptId = 'global';
    this._runtimeGlobals = [];
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
    this._enableSourceMaps = enabled;
    return this;
  }

  /**
   * Sets the name of the source file used when generating the source map.
   * @param {string} value the source file name.
   * @returns {Compiler} this
   */
  withSourceFile(value) {
    this._sourceFile = value;
    return this;
  }

  /**
   * Sets the offset of the code in the source file when generating the source map.
   * @param {number} value the offset.
   * @returns {Compiler} this
   */
  withSourceOffset(value) {
    this._sourceOffset = value;
    return this;
  }

  withScriptId(id) {
    this._scriptId = id;
    return this;
  }

  withGlobals(value) {
    this._runtimeGlobals = value;
    return this;
  }

  get scriptId() {
    return this._scriptId;
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

  pushBlock(name) {
    const block = {
      name,
      line: 1,
      code: '',
      lastIndentLevel: this._indentLevel,
      map: [],
    };
    this._blocks.push(block);
    this._templateStack.push(block);
    this._blk = block;
    this.setIndent(this._templateIndentLevel);
    return block;
  }

  popBlock() {
    const blk = this._templateStack.pop();
    this.setIndent(blk.lastIndentLevel);
    if (this._templateStack.length > 0) {
      this._blk = this._templateStack[this._templateStack.length - 1];
    } else {
      this._blk = this._main;
    }
  }

  process({ commands, templates }) {
    this._dom.beginDocument();

    // create a global block for global templates
    const globalBlock = this.pushBlock('');
    this.popBlock();

    // first process the main commands
    commands.forEach((c) => {
      c.accept(this);
    });

    // add global vars for templates
    this.outdent();
    // eslint-disable-next-line no-underscore-dangle
    Object.keys(this._dom._globalTemplates).forEach((name) => {
      if (this._runtimeGlobals.indexOf(name) < 0) {
        globalBlock.code += `${this._indent}let ${name};\n`;
        globalBlock.line += 1;
      }
    });
    this.indent();
    // eslint-disable-next-line no-underscore-dangle
    this._dom._globalTemplates = [];

    // then process the templates
    this._sourceOffset = 0;
    this._templateIndentLevel = 1;
    Object.values(templates).forEach((t) => {
      // this is kind of a hack to push code to the template stack
      const groupBlock = this.pushBlock('');
      this.outdent();
      this.out(`(function _template_${t.id.replace(/[^\w]/g, '_')}(){ `);
      this.popBlock();
      this._sourceFile = t.file;
      t.commands.forEach((c) => {
        c.accept(this);
      });
      this.pushBlock('');
      this.outdent();
      this.out('})();');
      this.popBlock();
      // add variable initializers for the template names
      // eslint-disable-next-line no-underscore-dangle
      Object.keys(this._dom._globalTemplates).forEach((name) => {
        groupBlock.code += `${this._indent}let ${name};\n`;
        groupBlock.line += 1;
      });
      // eslint-disable-next-line no-underscore-dangle
      this._dom._globalTemplates = [];
    });

    this._dom.endDocument();

    let templateCode = '';

    // create the template code mappings
    const templateMappings = [];
    let offset = 0;
    this._blocks.forEach((blk) => {
      templateCode += blk.code;
      blk.map.forEach((m) => {
        // eslint-disable-next-line no-param-reassign
        m.generated.line += offset;
        templateMappings.push(m);
      });
      // shift the offset by the length of the block
      offset += blk.line - 1;
    });

    return {
      code: this._main.code,
      mappings: this._main.map,
      templateCode,
      templateMappings,
    };
  }

  out(msg) {
    if (this._indent) {
      this._blk.code += `${this._indent}${msg}\n`;
    } else {
      this._blk.code += msg;
    }
    this._blk.line += 1;
  }

  _addMapping(location) {
    if (!location) {
      return;
    }
    const line = location.line + this._sourceOffset + 1;
    const { column } = location;

    // skip multiple mappings for the same original line and column, as
    // IDEs wouldn't probably know how to distinguish them
    const lastmapping = this._blk.map[this._blk.map.length - 1];
    if (lastmapping
      && lastmapping.original.line === line
      && lastmapping.original.column === column) {
      return;
    }
    this._blk.map.push({
      original: {
        line,
        column,
      },
      generated: {
        line: this._blk.line,
        column: 0,
      },
      source: this._sourceFile || '<internal>',
    });
  }

  visit(cmd) {
    if (this._enableSourceMaps) {
      this._addMapping(cmd.location);
    }

    if (cmd instanceof OutText) {
      this._dom.outText(cmd);
    } else if (cmd instanceof VariableBinding.Start) {
      this._dom.setVariable(cmd);
      // const exp = ExpressionFormatter.format(cmd.expression);
      // this.out(`const ${cmd.variableName} = ${exp};`);
    } else if (cmd instanceof VariableBinding.Global) {
      this._dom.setVariable(cmd);
    } else if (cmd instanceof VariableBinding.End) {
      // nop
    } else if (cmd instanceof FileReference) {
      this._dom.bindFunction(cmd);
    } else if (cmd instanceof FunctionBlock.Start) {
      this.pushBlock(cmd.expression);
      this._dom.functionStart(cmd);
    } else if (cmd instanceof FunctionBlock.End) {
      this._dom.functionEnd(cmd);
      this.popBlock();
    } else if (cmd instanceof FunctionCall) {
      this._dom.functionCall(cmd);
    } else if (cmd instanceof Conditional.Start) {
      this._dom.conditionStart(cmd);
      this.indent();
    } else if (cmd instanceof Conditional.End) {
      this.outdent();
      this._dom.conditionEnd();
    } else if (cmd instanceof OutputVariable) {
      this._dom.outVariable(cmd.variableName);
    } else if (cmd instanceof Loop.Init) {
      this._dom.loopInit(cmd);
    } else if (cmd instanceof Loop.Start) {
      this._dom.loopStart(cmd);
      this.indent();
    } else if (cmd instanceof Loop.End) {
      this.outdent();
      this._dom.loopEnd(cmd);
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
    } else if (cmd instanceof ExternalCode) {
      this.pushBlock('');
      this.out(cmd.code);
      this.popBlock();
    } else {
      throw new Error(`unknown command: ${cmd}`);
    }
  }
};
