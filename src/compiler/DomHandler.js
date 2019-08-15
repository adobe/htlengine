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

  functionStart(cmd) {
    const exp = ExpressionFormatter.escapeVariable(ExpressionFormatter.format(cmd.expression));
    const functionName = `_template_${exp.replace('.', '_')}`;
    this._out(`$.template('${exp}', function* ${functionName}(args) { `);
    this._gen.indent();
    cmd.args.forEach((arg) => {
      this._out(`const ${ExpressionFormatter.escapeVariable(arg)} = args[1]['${arg}'] || '';`);
    });
    this._out('let $t, $n = args[0];');
  }

  functionEnd() {
    this._gen.outdent();
    this._out('});');
  }

  functionCall(cmd) {
    const funcName = ExpressionFormatter.format(cmd.functionName);
    const args = ExpressionFormatter.format(cmd.args);
    this._out(`yield $.call($.template().${funcName}, [$n, ${args}]);`);
  }
};
