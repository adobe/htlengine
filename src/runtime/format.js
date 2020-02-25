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

module.exports = function format(fmt, args) {
  const locale = args.locale ? args.locale : '';
  const timezone = args.timezone ? args.timezone : '';
  const value = args.format;

  // test for matching number pattern
  if (/^[0-9.,#;$E%()-]*$/gm.test(fmt)) {
    // apply locale
    try {
      numeral.locale(locale.toLowerCase());
      // replace '#' with '0' as is expected by numeral
      const number = numeral(value).format(fmt.replace(/#/g, '0'));
      return number;
    } finally {
      // reset locale
      numeral.reset();
    }
  }

  // test for matching placeholder '{}' pattern
  if (/{(\d+)}/g.test(fmt)) {
    const argArray = Array.isArray(value) ? value : [value];
    return fmt.replace(/{(\d+)}/g, (match, number) => (typeof argArray[number] !== 'undefined'
      ? argArray[number]
      : match));
  }

  // default to date. parse date and put into timezone
  let date = moment.utc(parseInt(value, 10));
  if (!date.isValid()) {
    return null;
  }
  date = date.utcOffset(timezone).locale(locale);

  // map HTL format to moment.js format
  let dateFormat = '';

  let prev = fmt[0];
  let group = prev;
  for (let i = 1; i < fmt.length + 1; i += 1) {
    const c = fmt[i];
    if (c === prev) {
      group += c;
    } else {
      switch (group) {
        case 'D': dateFormat += 'DDD'; break;
        case 'DD': dateFormat += 'DDDD'; break;
        case 'd': dateFormat += 'D'; break;
        case 'dd': dateFormat += 'DD'; break;
        case 'y': dateFormat += 'Y'; break;
        case 'yy': dateFormat += 'YY'; break;
        case 'yyyy': dateFormat += 'YYYY'; break;
        case 'X': dateFormat += 'Z'; break;
        case 'XX': dateFormat += 'Z'; break;
        case 'XXX': dateFormat += 'Z'; break;
        case 'Z': dateFormat += 'ZZ'; break;
        case 'E': dateFormat += 'd'; break;
        case 'EE': dateFormat += 'dd'; break;
        case 'EEE': dateFormat += 'ddd'; break;
        case 'EEEE': dateFormat += 'dddd'; break;
        default: dateFormat += group; break;
      }
      prev = c;
      group = c;
    }
  }
  return date !== null ? date.format(dateFormat) : null;
};
