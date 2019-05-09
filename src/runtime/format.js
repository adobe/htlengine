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
  const tz = timezone.replace('GMT', '').replace('UTC', '');
  const date = moment(parseInt(format, 10));

  if (date.isValid()) {
    return date.utc(tz).locale(locale);
  }

  return null;
}

module.exports = function format(fmt, args) {
  const locale = args.locale ? args.locale : '';
  const timezone = args.timezone ? args.timezone : '';

  // test for matching number pattern
  if (/^[0-9.,#;$E%()-]*$/gm.test(fmt)) {
    // apply locale
    try {
      numeral.locale(locale.toLowerCase());
      // replace '#' with '0' as is expected by numeral
      const number = numeral(args.format).format(fmt.replace(/#/g, '0'));
      return number;
    } finally {
      // reset locale
      numeral.reset();
    }
  }

  // test for matching placeholder '{}' pattern
  if (/{(\d+)}/g.test(fmt)) {
    const argArray = Array.isArray(args.format) ? args.format : [args.format];
    return fmt.replace(/{(\d+)}/g, (match, number) => (typeof argArray[number] !== 'undefined'
      ? argArray[number]
      : match));
  }

  // default to date
  const date = parseDate(args.format, locale, timezone);
  return date !== null ? date.format(fmt) : null;
};
