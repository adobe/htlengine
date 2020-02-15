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

/* eslint-disable */

module.exports = function main(runtime) {
  const $ = {
    col: runtime.col,
    exec: runtime.exec.bind(runtime),
    xss: runtime.xss.bind(runtime),
    listInfo: runtime.listInfo.bind(runtime),
    use: runtime.use.bind(runtime),
    slyResource: runtime.resource.bind(runtime),
    call: runtime.call.bind(runtime),
    template: runtime.template.bind(runtime),
    dom: runtime.dom,
  };

  const $use_0 = myRequire('foo');
  const $use_1 = require("global-module");
  const $use_2 = require("./local-module");
  const $use_3 = require("./../relative-module");

  return runtime.run(function* () {

    const global = runtime.globals;

    let $t, $n = $.dom.start();
    const v1 = yield $.use($use_0, {});
    $.dom.text($n,"\n");
    const v2 = yield $.use($use_1, {});
    $.dom.text($n,"\n");
    const v4 = yield $.use($use_2, {});
    $.dom.text($n,"\n");
    const v5 = yield $.use($use_3, {});
    $.dom.text($n,"\n");
    return $.dom.end();

  });
};
