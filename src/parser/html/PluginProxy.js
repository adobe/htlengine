/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const Plugin = require('./Plugin');

module.exports = class PluginProxy {

    constructor() {
        this._plugins = [];
    }

    add(plugin) {
        this._plugins.push(plugin);
    }

    _delegate(fn, args) {
        this._plugins.forEach((p) => {
            p[fn].apply(p, args);
        });
    }
};

Object.getOwnPropertyNames(Plugin.prototype).filter(function (p) {
    return p.startsWith('before') || p.startsWith('after') || p.startsWith('on');
}).forEach((fn) => {
    module.exports.prototype[fn] = function() {
        this._delegate(fn, arguments);
    }
});
