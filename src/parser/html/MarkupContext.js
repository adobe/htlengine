/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the 'License'); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const MCTX = module.exports = {
    HTML: 'html',
    TEXT: 'text',
    ELEMENT_NAME: 'elementName',
    ATTRIBUTE_NAME: 'attributeName',
    ATTRIBUTE: 'attribute',
    URI: 'uri',
    SCRIPT_TOKEN: 'scriptToken',
    SCRIPT_STRING: 'scriptString',
    SCRIPT_COMMENT: 'scriptComment',
    SCRIPT_REGEXP: 'scriptRegExp',
    STYLE_TOKEN: 'styleToken',
    STYLE_STRING: 'styleString',
    STYLE_COMMENT: 'styleComment',
    COMMENT: 'comment',
    NUMBER: 'number',
    UNSAFE: 'unsafe'
};

const reverse = {};
Object.keys(MCTX).forEach((k) => {
    reverse[MCTX[k]] = k;
});

module.exports.lookup = (k) => {
    return reverse[k];
};

module.exports.attributeContext = (name) => {
    name = name.toLowerCase();
    if ("src" === name || "href" === name) {
        return MCTX.URI;
    }
    return MCTX.ATTRIBUTE;
}
