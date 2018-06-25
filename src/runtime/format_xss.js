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

const VALID_ATTRIBUTE = /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/;
const BLACKLIST_ATTRIBUTE = /^(style|(on.*))$/;
const ELEMENT_NAME_WHITELIST = [
  'a', 'abbbr', 'address', 'article', 'aside',
  'b', 'bdi', 'bdo', 'blockquote', 'br', 'caption',
  'cite', 'code', 'col', 'colgroup', 'data', 'dd',
  'del', 'dfn', 'div', 'dl', 'dt', 'em', 'figcaption',
  'figure', 'footer', 'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'header', 'i', 'ins', 'kbd', 'li', 'main',
  'mark', 'nav', 'ol', 'p', 'pre', 'q', 'rp', 'rt',
  'ruby', 's', 'samp', 'section', 'small', 'span',
  'strong', 'sub', 'sup', 'table', 'tbody', 'td',
  'tfoot', 'th', 'thead', 'time', 'tr', 'u', 'ul',
  'var', 'wbr',
].reduce((set, e) => {
  set[e] = true; // eslint-disable-line no-param-reassign
  return set;
}, {});

function isUriAttribute(name) {
  return name === 'href' || name === 'src';
}

function filterAttributeName(name) {
  const trimmedName = (name || '').trim();
  if (VALID_ATTRIBUTE.test(trimmedName) && !BLACKLIST_ATTRIBUTE.test(trimmedName)) {
    return name;
  }
  return '';
}

function escapeAttributeValue(input, mContext) {
  if (isUriAttribute(mContext.attributeName)) {
    return xss.getValidHref(input);
  }
  return xss.encodeForHTMLAttribute(input);
}

function filterElementName(input) {
  const trimmedInput = (input || '').trim();
  if (trimmedInput.toLowerCase() in ELEMENT_NAME_WHITELIST) {
    return trimmedInput;
  }
  return 'div';
}

module.exports = function formatXss(value, ctx) {
  if (typeof value === 'boolean' || value === undefined) {
    return value;
  }
  const stringValue = Array.isArray(value) ? value.join(',') : `${value}`;

  switch (ctx) {
    case 'unsafe':
      return stringValue;
    case 'html':
      return xss.filterHTML(stringValue);

    case 'comment':
    case 'text':
      return xss.encodeForHTML(stringValue);
    case 'elementName':
      return filterElementName(stringValue);

    case 'attributeName':
      return filterAttributeName(stringValue);
    case 'attribute':
      return escapeAttributeValue(stringValue, ctx);

    case 'uri':
      return xss.getValidHref(stringValue);

    case 'scriptComment':
    case 'styleComment':
      return xss.getValidMultiLineComment(stringValue, '');

    case 'scriptToken':
      return xss.getValidJSToken(stringValue, '');
    case 'scriptString':
      return xss.encodeForJSString(stringValue);

    case 'scriptRegexp':
      throw new Error('Not implemented');

    case 'number': {
      const num = Number.parseFloat(stringValue);
      if (!Number.isNaN(num)) {
        return stringValue;
      }
      return 0;
    }

    case 'styleToken':
      return xss.getValidStyleToken(stringValue, '');
    case 'styleString':
      return xss.encodeForCSSString(stringValue);
    default:
      throw new Error(`Invalid markup context: ${ctx}`);
  }
};
