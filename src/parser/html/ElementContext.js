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
const Plugin = require('./Plugin');


/**
 * The element context contains the information about the current processed element in the markup handler,
 * @type {module.ElementContext}
 */
module.exports = class ElementContext {

    constructor(tagName) {
        this._tagName = tagName;
        this._attributes = [];
        this._isSlyTag = 'sly' === tagName.toLowerCase();
        this._plugin = new Plugin();
    }

    addAttribute(name, value, quoteChar) {
        this._attributes.push({
            name,
            value,
            quoteChar
        });
    }

    get tagName() {
        return this._tagName;
    }

    get isSlyTag() {
        return this._isSlyTag;
    }

    get attributes() {
        return this._attributes;
    }

    addPlugin(p) {
        // todo: composite plugin
        this._plugin = p;
    }

    get plugin() {
        return this._plugin;
    }
};
