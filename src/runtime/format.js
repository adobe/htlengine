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

const moment = require('moment');
const numeral = require('numeral');
require('numeral/locales');

function parseDate(format, locale, timezone) {
  const date = moment(parseInt(format, 10));
  if (date.isValid()) {
    return date.utc(timezone).locale(locale);
  }

  return null;
}

module.exports = function format(fmt, args) {
  const PLACEHOLDER_REGEX = /{(\d+)}/g;
  const NUMBER_FORMAT_REGEX = /^[0-9.,#;$E%()-]*$/gm;
  const PLACEHOLDER_NUMBER = /#/g;
  const argArray = Array.isArray(args.format) ? args.format : [args.format];
  const locale = args.locale ? args.locale : '';
  const timezone = args.timezone ? args.timezone.replace('GMT', '').replace('UTC', '') : '';

  if (NUMBER_FORMAT_REGEX.test(fmt)) {
    // apply locale
    numeral.locale(locale.toLowerCase());
    const number = numeral(args.format).format(fmt.replace(PLACEHOLDER_NUMBER, '0'));
    // reset locale
    numeral.reset();
    return number;
  } if (PLACEHOLDER_REGEX.test(fmt)) {
    return fmt.replace(PLACEHOLDER_REGEX, (match, number) => (typeof argArray[number] !== 'undefined'
      ? argArray[number]
      : match));
  }

  // default to date
  const date = parseDate(args.format, locale, timezone);
  return date !== null ? date.format(fmt) : null;
};
