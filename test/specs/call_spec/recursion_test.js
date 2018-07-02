/*
 * Copyright 2018 Deloitte Digital. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
module.exports = class MyUseClass {
  // eslint-disable-next-line class-methods-use-this
  use() {
    return {
      pages: [
        {
          title: 'Page A',
          pages: [
            {
              title: 'Page 1',
            }, {
              title: 'Page 2',
            }, {
              title: 'Page 3',
            },
          ],
        }, {
          title: 'Page B',
          pages: [
            {
              title: 'Page 1',
            }, {
              title: 'Page 2',
            },
          ],
        }, {
          title: 'Page C',
          pages: [
            {
              title: 'Page 1',
            }, {
              title: 'Page 2',
            }, {
              title: 'Page 3',
            }, {
              title: 'Page 4',
            },
          ],
        },
      ],
    };
  }
};
