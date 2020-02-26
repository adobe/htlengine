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

const PLUGIN_PREFIX = 'PLUGIN_DATA_SLY_';

const ECTX = {

  // Plugin contexts
  PLUGIN_DATA_SLY_USE: 'PLUGIN_DATA_SLY_USE',
  PLUGIN_DATA_SLY_TEXT: 'PLUGIN_DATA_SLY_TEXT',
  PLUGIN_DATA_SLY_SET: 'PLUGIN_DATA_SLY_SET',
  PLUGIN_DATA_SLY_ATTRIBUTE: 'PLUGIN_DATA_SLY_ATTRIBUTE',
  PLUGIN_DATA_SLY_ELEMENT: 'PLUGIN_DATA_SLY_ELEMENT',
  PLUGIN_DATA_SLY_TEST: 'PLUGIN_DATA_SLY_TEST',
  PLUGIN_DATA_SLY_LIST: 'PLUGIN_DATA_SLY_LIST',
  PLUGIN_DATA_SLY_REPEAT: 'PLUGIN_DATA_SLY_REPEAT',
  PLUGIN_DATA_SLY_INCLUDE: 'PLUGIN_DATA_SLY_INCLUDE',
  PLUGIN_DATA_SLY_RESOURCE: 'PLUGIN_DATA_SLY_RESOURCE',
  PLUGIN_DATA_SLY_TEMPLATE: 'PLUGIN_DATA_SLY_TEMPLATE',
  PLUGIN_DATA_SLY_CALL: 'PLUGIN_DATA_SLY_CALL',
  PLUGIN_DATA_SLY_UNWRAP: 'PLUGIN_DATA_SLY_UNWRAP',

  // Markup contexts
  ELEMENT: 'ELEMENT',
  TEXT: 'TEXT',
  ATTRIBUTE: 'ATTRIBUTE',

  getContextForPlugin: (name) => {
    const ctx = ECTX[PLUGIN_PREFIX + name.toUpperCase()];
    if (!ctx) {
      throw new Error(`invalid plugin: ${name}`);
    }
    return ctx;
  },
};

module.exports = ECTX;
