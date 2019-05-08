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

module.exports = function format(fmt, args) {
  const argArray = Array.isArray(args) ? args : [args];
  if (!Array.isArray(args)) {
    const date = moment(parseInt(argArray, 10));
    if (date.isValid()) {
      return date.format(fmt);
    }
  }

  return fmt.replace(/{(\d+)}/g, (match, number) => (typeof argArray[number] !== 'undefined'
    ? argArray[number]
    : match));
};
