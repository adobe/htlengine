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
const xss = require('./xss_api');

const VALID_ATTRIBUTE = /^[a-zA-Z_:][\-a-zA-Z0-9_:\.]*$/;
const BLACKLIST_ATTRIBUTE = /^(style|(on.*))$/;
const ELEMENT_NAME_WHITELIST = [
    "a", "abbbr", "address", "article", "aside",
    "b", "bdi", "bdo", "blockquote", "br", "caption",
    "cite", "code", "col", "colgroup", "data", "dd",
    "del", "dfn", "div", "dl", "dt", "em", "figcaption",
    "figure", "footer", "h1", "h2", "h3", "h4",
    "h5", "h6", "header", "i", "ins", "kbd", "li", "main",
    "mark", "nav", "ol", "p", "pre", "q", "rp", "rt",
    "ruby", "s", "samp", "section", "small", "span",
    "strong", "sub", "sup", "table", "tbody", "td",
    "tfoot", "th", "thead", "time", "tr", "u", "ul",
    "var", "wbr"
].reduce(function(set, e) {
    set[e] = true;
    return set;
}, {});

module.exports = function format_xss(value, ctx) {
    switch (ctx) {
        case 'unsafe':
            return value;
        case 'html':
            return xss.filterHTML(value);

        case 'comment':
        case 'text':
            return xss.encodeForHTML(value);
        case 'elementName':
            return filterElementName(value);

        case 'attributeName':
            return filterAttributeName(value);
        case 'attribute':
            return escapeAttributeValue(value, ctx);

        case 'uri':
            return xss.getValidHref(value);

        case 'scriptComment':
        case 'styleComment':
            return xss.getValidMultiLineComment(value, '');

        case 'scriptToken':
            return xss.getValidJSToken(value, '');
        case 'scriptString':
            return xss.encodeForJSString(value);

        case 'scriptRegexp':
            throw new Error('Not implemented');

        case 'number':
            const num = Number.parseFloat(value);
            if (!Number.isNaN(num)) {
                return '' + value;
            }
            return 0;

        case 'styleToken':
            return xss.getValidStyleToken(value, '');
        case 'styleString':
            return xss.encodeForCSSString(value);
        default:
            throw new Error('Invalid markup context: ' + ctx);
    }
};

function isUriAttribute(name) {
    return name === 'href' || name === 'src';
}

function filterAttributeName(name) {
    name = name || '';
    name = name.trim();
    if (VALID_ATTRIBUTE.test(name) && !BLACKLIST_ATTRIBUTE.test(name)) {
        return name;
    } else {
        return '';
    }
}

function escapeAttributeValue(input, mContext) {
    if (isUriAttribute(mContext.attributeName)) {
        return xss.getValidHref(input);
    } else {
        return xss.encodeForHTMLAttribute(input);
    }
}

function filterElementName(input) {
    input = input || '';
    input = input.trim();

    if (input.toLowerCase() in ELEMENT_NAME_WHITELIST) {
        return input;
    } else {
        return 'div';
    }
}
