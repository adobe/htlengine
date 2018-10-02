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

/**
 * A {@code Command} represents the type of instruction a certain HTL expression or block element
 * should execute.
 * Commands are immutable and can only be processed through a {@link CommandVisitor}.
 */
module.exports = class Command {
  constructor(location) {
    this._location = location;
  }

  /**
     * Accept a visitor.
     *
     * @param {CommandVisitor} visitor the visitor that will process this command
     */
  accept(visitor) {
    visitor.visit(this);
  }

  get location() {
    return this._location;
  }
};
