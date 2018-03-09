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

const Atom = require('./Atom');

module.exports = class BooleanConstant extends Atom {

    constructor(text) {
        super();
        this._value = text.toString() === 'true';
        this._text = text;
    }

    get text() {
        return this._text;
    }

    get value() {
        return this._value;
    }
};

module.exports.TRUE = new module.exports(true);
module.exports.FALSE = new module.exports(false);

