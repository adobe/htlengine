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

// declared dependencies
const fse = require('fs-extra');
// local modules
const engine = require('../src/main');

(async () => {
  const filename = process.argv[2];
  const template = await fse.readFile(filename, 'utf-8');

  const resource = {
    list: {
      dateFormatString: 'yyyy-MM-dd',
      listItems: [
        {
          path: '/content/core-components-examples/library/carousel',
          title: 'Carousel',
          description: 'Cycle through content panels',
          url: '/content/core-components-examples/library/carousel.html',
          lastModified: 1550252345916,
        },
      ],
      showDescription: true,
      showModificationDate: true,
      linkItems: true,
      wrap: false,
      ':type': 'core/wcm/components/list/v2/list',
    },
  };

  engine(resource, template).then((ret) => {
    // eslint-disable-next-line no-console
    console.log(ret.body);
  });
})();
