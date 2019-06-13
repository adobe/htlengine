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

const Command = require('./Command');

module.exports = {

  Init: class Init extends Command {
    constructor(variableName, expression) {
      super();
      this._variableName = variableName;
      this._expression = expression;
    }

    get variableName() {
      return this._variableName;
    }

    get expression() {
      return this._expression;
    }
  },

  Start: class Start extends Command {
    constructor(listVariable, itemVariable, indexVariable) {
      super();
      this._listVariable = listVariable;
      this._itemVariable = itemVariable;
      this._indexVariable = indexVariable;
    }

    get listVariable() {
      return this._listVariable;
    }

    get itemVariable() {
      return this._itemVariable;
    }

    get indexVariable() {
      return this._indexVariable;
    }
  },

  End: class End extends Command {

  },

};

module.exports.END = new module.exports.End();
