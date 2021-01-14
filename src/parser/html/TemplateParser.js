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

const MarkupHandler = require('./MarkupHandler');
const CommandStream = require('../commands/CommandStream');
const HTMLParser = require('./HTMLParser');

module.exports = class TemplateParser {
  /**
   * Sets the default markup context when writing properties to the response.
   * @param {MarkupContext} context the default context
   * @return this
   */
  withDefaultMarkupContext(context) {
    this._defaultMarkupContext = context;
    return this;
  }

  /**
     * Parses the input and returns an the generated commands.
     * @param {String} input Input text
     * @return {Command[]} The generated commands
     */
  // eslint-disable-next-line class-methods-use-this
  parse(input) {
    const stream = new CommandStream();
    const handler = new MarkupHandler(stream);
    if (this._defaultMarkupContext !== undefined) {
      handler.withDefaultMarkupContext(this._defaultMarkupContext);
    }

    HTMLParser.parse(input, handler);
    return stream.commands;
  }
};
