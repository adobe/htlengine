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

'use strict';

const esapiEncoder = require('node-esapi').encoder();
const XRegExp = require('xregexp');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const DOMPurify = createDOMPurify(new JSDOM('').window);

const RESERVED_WORDS = {
  break: true,
  case: true,
  catch: true,
  continue: true,
  debugger: true,
  default: true,
  delete: true,
  do: true,
  else: true,
  finally: true,
  for: true,
  function: true,
  if: true,
  in: true,
  instanceof: true,
  typeof: true,
  new: true,
  return: true,
  void: true,
  switch: true,
  while: true,
  this: true,
  with: true,
  throw: true,
  try: true,
  class: true,
  enum: true,
  extends: true,
  super: true,
  const: true,
  export: true,
  import: true,
  implements: true,
  let: true,
  private: true,
  public: true,
  interface: true,
  package: true,
  protected: true,
  static: true,
};

/* Building the URL validation RegEx */
const ALPHA = '(?:\\p{L}\\p{M}*)';
const HEX_DIGIT = '[A-Fa-f0-9]';
const PCT_ENCODED = `%${HEX_DIGIT}${HEX_DIGIT}`;
const UNRESERVED_CHARACTERS = `${ALPHA}|[\\p{N}\\-._~]`;
const SUB_DELIMS = '[!$&\'()*+,;=]';
const REG_NAME = `(?:(?:${UNRESERVED_CHARACTERS})*|(?:${PCT_ENCODED})*|(?:${SUB_DELIMS})*)`;
const PCHAR = `${UNRESERVED_CHARACTERS}|${PCT_ENCODED}|${SUB_DELIMS}|:|@`;
const DEC_OCTET = '(?:\\p{N}|[\\x31-\\x39]\\p{N}|1\\p{N}{2}|2[\\x30-\\x34]\\p{N}|25[\\x30-\\x35])';
const H16 = `${HEX_DIGIT}{1,4}`;
const IPV4_ADDRESS = `${DEC_OCTET}\\.${DEC_OCTET}\\.${DEC_OCTET}\\.${DEC_OCTET}`;
const LS32 = `(?:${H16}:${H16})|${IPV4_ADDRESS}`;
const IPV6_ADDRESS = `(?:(?:(?:${H16}:){6}(?:${LS32}))|`
        + `(?:::(?:${H16}:){5}(?:${LS32}))|`
        + `(?:(?:${H16}){0,1}::(?:${H16}:){4}(?:${LS32}))|`
        + `(?:(?:(?:${H16}:){0,1}${H16})?::(?:${H16}:){3}(?:${LS32}))|`
        + `(?:(?:(?:${H16}:){0,2}${H16})?::(?:${H16}:){2}(?:${LS32}))|`
        + `(?:(?:(?:${H16}:){0,3}${H16})?::(?:${H16}:){1}(?:${LS32}))|`
        + `(?:(?:(?:${H16}:){0,4}${H16})?::(?:${LS32}))|`
        + `(?:(?:(?:${H16}:){0,5}${H16})?::(?:${H16}))|`
        + `(?:(?:(?:${H16}:){0,6}${H16})?::))`;
const IP_LITERAL = `\\[${IPV6_ADDRESS}]`;
const PORT = '[0-9]+';
const HOST = `(?:${IP_LITERAL}|${IPV4_ADDRESS}|${REG_NAME})`;
const USER_INFO = `(?:(?:${UNRESERVED_CHARACTERS})|(?:${PCT_ENCODED})|(?:${SUB_DELIMS}))*`;
const AUTHORITY = `(?:${USER_INFO}@)?${HOST}(?::${PORT})?`;
const SCHEME_PATTERN = '(?!\\s*javascript)\\p{L}[\\p{L}\\p{N}+.\\-]*';
const FRAGMENT = `(?:${PCHAR}|\\/|\\?)*`;
const QUERY = `(?:${PCHAR}|\\/|\\?)*`;
const SEGMENT_NZ = `(?:${PCHAR})+`;
const SEGMENT_NZ_NC = `(?:${UNRESERVED_CHARACTERS}|${PCT_ENCODED}|${SUB_DELIMS}|@)+`;
const PATH_ABEMPTY = `(?:\\/|(\\/${SEGMENT_NZ}\\/?)*)`;
const PATH_ABSOLUTE = `\\/(?:${SEGMENT_NZ}${PATH_ABEMPTY})?`;
const PATH_NOSCHEME = `${SEGMENT_NZ_NC}(?:\\/|(\\/${SEGMENT_NZ})*)`;
const PATH_ROOTLESS = `${SEGMENT_NZ}(?:\\/|(\\/${SEGMENT_NZ})*)`;
const PATH_EMPTY = '(?:^$)';
const RELATIVE_PART = `(?:(?:\\/\\/${AUTHORITY}${PATH_ABEMPTY})|(?:${PATH_ABSOLUTE})|(?:${PATH_ROOTLESS}))`;
const HIER_PART = `(?:(?:\\/\\/${AUTHORITY}${PATH_ABEMPTY})|(?:${PATH_ABSOLUTE})|(?:${PATH_NOSCHEME})|${PATH_EMPTY})`;

const RELATIVE_REF = `^(?!\\s*javascript(?::|&colon;))${RELATIVE_PART}?(?:\\?${QUERY})?(?:#${FRAGMENT})?$`;
const URI = `^${SCHEME_PATTERN}:${HIER_PART}(?:\\?${QUERY})?(?:#${FRAGMENT})?$`;

function escapeJSString(input) {
  return esapiEncoder.encodeForJavaScript(input);
}

const IDENTIFIER_PATTERN = /^[a-zA-Z$_][a-zA-Z0-9_$]*$/;
const NUMBER_PATTERN = /^-?\d+$/; // todo: expand for decimal point numbers

function isStringLiteral(input) {
  if (input.length < 2) {
    return false;
  }
  const first = input[0];
  return (first === '"' || first === "'") && input[input.length - 1] === first;
}

function escapeJSToken(input) {
  const trimmedInput = input.trim();
  if (isStringLiteral(trimmedInput)) {
    const quoteChar = trimmedInput[0];
    const strContent = trimmedInput.substring(1, trimmedInput.length - 1);
    const escaped = (strContent.length > 0) ? escapeJSString(strContent) : '';
    return quoteChar + escaped + quoteChar;
  }
  if (NUMBER_PATTERN.test(trimmedInput)) {
    return trimmedInput;
  }
  if (IDENTIFIER_PATTERN.test(trimmedInput) && !RESERVED_WORDS[trimmedInput]) {
    return trimmedInput;
  }
  return undefined;
}

function sanitizeURL(url) {
  try {
    if (XRegExp(RELATIVE_REF).test(url) || XRegExp(URI).test(url)) {
      return url;
    }
  } catch (e) {
    // ignore
  }
  return '';
}

/* eslint-disable no-underscore-dangle */
const _NON_ASCII = '\\x00\\x08\\x0B\\x0C\\x0E-\\x1F';
/** http://www.w3.org/TR/css-syntax-3/#number-token-diagram */
const _NUMBER = '[+-]?[\\d]*[\\.]?[\\d]*(?:[e][+-]?\\d+)?';
/** http://www.w3.org/TR/css-syntax-3/#hex-digit-diagram */
const _HEX_DIGITS = '#[0-9a-f]*';
/** http://www.w3.org/TR/css-syntax-3/#ident-token-diagram */
const _IDENTIFIER = `-?[a-z_${_NON_ASCII}][\\w_\\-${_NON_ASCII}]*`;
/** http://www.w3.org/TR/css-syntax-3/#string-token-diagram */
const _STRING = "\"(?:[^\"^\\\\^\\n]|(?:\\\\\"))*\"|'(?:[^'^\\\\^\\n]|(?:\\\\'))*'";
/** http://www.w3.org/TR/css-syntax-3/#dimension-token-diagram */
const _DIMENSION = _NUMBER + _IDENTIFIER;
/** http://www.w3.org/TR/css-syntax-3/#percentage-token-diagram */
const _PERCENT = `${_NUMBER}%`;
/** http://www.w3.org/TR/css-syntax-3/#function-token-diagram */
const _FUNCTION = `${_IDENTIFIER}\\((?:(?:${_NUMBER})|(?:${_IDENTIFIER})|(?:[\\s]*)|(?:,))*\\)`;
/** http://www.w3.org/TR/css-syntax-3/#url-unquoted-diagram */
const _URL_UNQUOTED = `[^"^'^\\(^\\)^[${_NON_ASCII}]]*`;
/** http://www.w3.org/TR/css-syntax-3/#url-token-diagram */
const _URL = `url\\((?:(?:${_URL_UNQUOTED})|(?:${_STRING}))\\)`;
/** composite regular expression for style token validation */
const _CSS_TOKEN = `(?:${_NUMBER})`
  + `|(?:${_DIMENSION})`
  + `|(?:${_PERCENT})`
  + `|(?:${_HEX_DIGITS})`
  + `|(?:${_IDENTIFIER})`
  + `|(?:${_STRING})`
  + `|(?:${_FUNCTION})`
  + `|(?:${_URL})`;

/* eslint-enable no-underscore-dangle */

const CSS_TOKEN = new RegExp(_CSS_TOKEN, 'i');
// const URL = new RegExp(_URL);
// const URL_UNQUOTED = new RegExp(_URL_UNQUOTED);
// const FUNCTION = new RegExp(_FUNCTION);
// const PERCENT = new RegExp(_PERCENT);
// const DIMENSION = new RegExp(_DIMENSION);
// const STRING = new RegExp(_STRING);
// const IDENTIFIER = new RegExp(_IDENTIFIER);
// const HEX_DIGITS = new RegExp(_HEX_DIGITS);
// const NUMBER = new RegExp(_NUMBER);
// const NON_ASCII = new RegExp(_NON_ASCII);

/**
 * Provides filtering against cross-site scripting attacks
 */
module.exports = {

  /**
   * Filter potentially user-contributed HTML by removing malicious tags and
   * attributes
   * @param {String} input - the original input
   * @returns {String}
   */
  filterHTML(input) {
    return DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
  },

  /**
   * Encodes an input string for HTML element content.
   * @param {String} input - the original input
   * @returns {String}
   */
  encodeForHTML(input) {
    return esapiEncoder.encodeForHTML(input);
  },

  /**
   * Encodes a source string for writing to an HTML attribute value.
   * @param {String} input
   * @returns {String}
   */
  encodeForHTMLAttribute(input) {
    return esapiEncoder.encodeForHTMLAttribute(input);
  },

  /**
   * Encodes a source string for writing to JavaScript string content.
   * @param {String} input - the original input
   * @returns {String}
   */
  encodeForJSString(input) {
    return escapeJSString(input);
  },

  /**
   * Validate a Javascript token.  The value must be either a single identifier, a literal number,
   * or a literal string.
   * @param {String} input - the original input
   * @param {String} defaultValue - a default value to use if the source doesn't meet validity
   * constraints.
   * @returns {String}
   */
  getValidJSToken(input, defaultValue) {
    if (typeof input !== 'string') {
      return defaultValue;
    }
    const encoded = escapeJSToken(input);
    if (encoded === undefined) {
      return defaultValue;
    }
    return encoded;
  },

  /**
   * Sanitizes a URL for writing as an HTML href or src attribute value.
   * @param {String} url
   * @returns {String} a sanitized URL (possibly empty)
   */
  getValidHref(url) {
    if (typeof url !== 'string') {
      return '';
    }
    return sanitizeURL(url.trim());
  },

  /**
   * Validate a style/CSS token. Valid CSS tokens are specified at http://www.w3.org/TR/css3-syntax/
   * @param {String} input        the source token
   * @param {String} defaultValue a default value to use if the source is {@code null},
   *                              an empty string, or doesn't meet validity constraints.
   * @return {String} a string containing sanitized style token
   */
  getValidStyleToken(input, defaultValue) {
    if (typeof input === 'string' && input.length > 0 && CSS_TOKEN.test(input)) {
      return input;
    }
    return defaultValue;
  },

  encodeForCSSString(input) {
    return esapiEncoder.encodeForCSS(input);
  },

  getValidMultiLineComment(comment, defaultComment) {
    if (comment != null && comment.indexOf('*/') < 0) {
      return comment;
    }
    return defaultComment;
  },
};
