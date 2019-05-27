/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
module.exports = class Helper {
  async use(globals) {
    const document = globals.document;
    return {
      get title() {
        return document.querySelector('h1').innerHTML;
      },

      get headings() {
        // HTL iterator doesn't support NodeLists correctly yet.
        const ret = [];
        for(const h of document.querySelectorAll('h1,h2,h3').values()) {
          ret.push(h);
        }
        return ret;
      },
    };
  }
};
