/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const OutputVariable = require('../parser/commands/OutputVariable');
const ExpressionFormatter = require('./ExpressionFormatter');

module.exports = class DomHandler {
  constructor(generator) {
    this._gen = generator;
    this._out = generator.out.bind(generator);
    this._globalTemplates = {};
    this._currentTemplate = {
      id: 'global',
      name: 'global',
      stack: [new Set()],
    };
  }

  beginDocument() {
    this._out('let $t, $n = $.dom.start();');
  }

  endDocument() {
    this._out('return $.dom.end();');
  }

  outText(cmd) {
    this._out(`$.dom.text($n,${JSON.stringify(cmd.text)});`);
  }

  doctype(cmd) {
    this._out(`$n = $.dom.doctype($n,'${cmd.name}');`);
  }

  comment(cmd) {
    if (cmd.text instanceof OutputVariable) {
      this._out(`$.dom.rem($n,${cmd.text.variableName});`);
    } else {
      this._out(`$.dom.rem($n,${JSON.stringify(cmd.text)});`);
    }
  }

  outVariable(variableName) {
    this._out(`$.dom.append($n, ${variableName});`);
  }

  createElement(cmd) {
    const name = cmd.name instanceof OutputVariable
      ? cmd.name.variableName
      : JSON.stringify(cmd.name);
    this._out(`$t = $.dom.create(${name},${cmd.isEmpty},${cmd.isVoid});`);
  }

  pushElement() {
    this._out('$n = $.dom.push($n,$t);');
  }

  popElement() {
    this._out('$n = $.dom.pop($n);');
  }

  addAttribute(cmd) {
    const { value } = cmd;
    const name = cmd.name instanceof OutputVariable ? cmd.name.variableName : `'${cmd.name}'`;
    if (value instanceof OutputVariable) {
      this._out(`$.dom.attr($t, ${name}, ${value.variableName}, '${cmd.context}');`);
    } else {
      this._out(`$.dom.attr($t, ${name}, ${value === null ? 'null' : JSON.stringify(value)}, '${cmd.context}');`);
    }
  }

  setVariable(cmd) {
    const exp = ExpressionFormatter.format(cmd.expression);
    const name = ExpressionFormatter.escapeVariable(cmd.variableName);
    if (this._isVarDefined(name)) {
      this._out(`${name} = ${exp};`);
    } else {
      this._defineVar(name);
      this._out(`const ${name} = ${exp};`);
    }
  }

  conditionStart(cmd) {
    const exp = ExpressionFormatter.format(cmd.expression);
    const neg = cmd.negate ? '!' : '';
    this._out(`if (${neg}${exp}) {`);
    this._pushBlock();
  }

  conditionEnd() {
    this._popBlock();
    this._out('}');
  }

  loopInit(cmd) {
    const exp = ExpressionFormatter.format(cmd.expression);
    if (cmd.options && Object.keys(cmd.options).length) {
      const opts = {};
      Object.entries(cmd.options).forEach(([key, value]) => {
        opts[key] = ExpressionFormatter.format(value);
      });
      this._out(`const ${cmd.variableName} = $.col.init(${exp},${JSON.stringify(opts)});`);
    } else {
      this._out(`const ${cmd.variableName} = $.col.init(${exp});`);
    }
  }

  loopStart(cmd) {
    this._out(`for (const ${cmd.indexVariable} of $.col.keys(${cmd.listVariable})) {`);
    this._out(`  const ${cmd.itemVariable} = $.col.get(${cmd.listVariable}, ${cmd.indexVariable});`);
    this._pushBlock();
  }

  loopEnd() {
    this._popBlock();
    this._out('}');
  }

  bindFunction(cmd) {
    if (this._isVarDefined(cmd.name)) {
      this._out(`${cmd.name} = $.template('${cmd.id}');`);
    } else {
      this._defineVar(cmd.name);
      this._out(`let ${cmd.name} = $.template('${cmd.id}');`);
    }
  }

  functionStart(cmd) {
    const name = ExpressionFormatter.escapeVariable(ExpressionFormatter.format(cmd.expression));
    const id = cmd.id || this._gen.scriptId;
    const functionName = `_template_${id.replace(/[^\w]/g, '_')}_${name.replace(/\./g, '_')}`;
    // this._out(`${exp} = $.template('${id}', '${exp}', function* ${functionName}(args) { `);
    this._out(`${name} = function* ${functionName}(args) { `);
    this._gen.indent();
    const vars = new Set();
    cmd.args.forEach((arg) => {
      const varName = ExpressionFormatter.escapeVariable(arg).toLowerCase();
      vars.add(varName);
      this._out(`let ${varName} = args[1]['${arg}'] || '';`);
    });
    this._out('let $t, $n = args[0];');
    this._globalTemplates[name] = id;
    this._currentTemplate = {
      id,
      name,
      functionName,
      stack: [vars],
    };
  }

  functionEnd() {
    this._gen.outdent();
    this._out('};');
    const { id, name } = this._currentTemplate;
    this._out(`$.template('${id}', '${name}', ${name});`);
  }

  functionCall(cmd) {
    const funcName = ExpressionFormatter.format(cmd.functionName);
    const args = ExpressionFormatter.format(cmd.args);
    this._out(`yield $.call(${funcName}, [$n, ${args}]);`);
  }

  _isVarDefined(name) {
    if (!this._currentTemplate) {
      return false;
    }
    return !!this._currentTemplate.stack.find((s) => s.has(name));
  }

  _defineVar(name) {
    if (this._currentTemplate) {
      this._currentTemplate.stack[0].add(name);
    }
  }

  _pushBlock() {
    if (this._currentTemplate) {
      this._currentTemplate.stack.unshift(new Set());
    }
  }

  _popBlock() {
    if (this._currentTemplate) {
      this._currentTemplate.stack.shift();
    }
  }
};
