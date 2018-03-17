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
const Plugin = require('../html/Plugin');
const VariableBinding = require('../commands/VariableBinding');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const MapLiteral = require('../htl/nodes/MapLiteral');

const DEFAULT_VARIABLE_NAME = "useBean";

module.exports = class UsePlugin extends Plugin {

    constructor(signature, ctx, expression, attributeName) {
        super(signature, ctx, expression);
    }

    beforeElement(stream, tagName) {
        const variableName = this._signature.getVariableName(DEFAULT_VARIABLE_NAME);
        stream.write(new VariableBinding.Global(variableName,
            new RuntimeCall('use', this._expression.root, [new MapLiteral(this._expression.options)])
        ));
    }

};