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
const SCHEME = "scheme";
const DOMAIN = "domain";
const PATH = "path";
const APPEND_PATH = "appendPath";
const PREPEND_PATH = "prependPath";
const SELECTORS = "selectors";
const ADD_SELECTORS = "addSelectors";
const REMOVE_SELECTORS = "removeSelectors";
const EXTENSION = "extension";
const SUFFIX = "suffix";
const PREPEND_SUFFIX = "prependSuffix";
const APPEND_SUFFIX = "appendSuffix";
const FRAGMENT = "fragment";
const QUERY = "query";
const ADD_QUERY = "addQuery";
const REMOVE_QUERY = "removeQuery";

const URI = require('urijs');
module.exports = function format_uri(uri, opts) {

    let u = URI(uri);
    if (SCHEME in opts) {
        u.scheme(opts[SCHEME]);
    }
    if (DOMAIN in opts) {
        u.host(opts[DOMAIN]);
    }

    // remove selectors and suffixes for path manipulation
    const p = u.path();
    const idxSelStart = p.indexOf('.');
    let idxSuffix = idxSelStart < 0 ? -1 : p.indexOf('/', idxSelStart);
    if (idxSuffix < 0) {
        idxSuffix = p.length;
    }
    const idxExtension = p.lastIndexOf('.', idxSuffix);
    let selectorString = idxSelStart < 0 ? '' : p.substring(idxSelStart, idxExtension);
    let selectors = selectorString ? selectorString.substring(1).split('.') : [];
    let extension = idxExtension < 0 ? '' : p.substring(idxExtension, idxSuffix);
    let suffix = idxSuffix < 0 ? '' : p.substring(idxSuffix);
    const pp = idxSelStart <0 ? p : p.substring(0, idxSelStart);

    // console.log(`'${p}' -> '${pp}' '${selectors}' '${extension}' '${suffix}'`);

    if (idxSelStart >= 0) {
        u.path(p.substring(0, idxSelStart));
    }

    const setPath = opts[PATH];
    if (setPath) {
        u.path(setPath);
    }
    const appendPath = opts[APPEND_PATH];
    if (appendPath) {
        u.path(u.path() + '/' + appendPath);
    }
    const prependPath = opts[PREPEND_PATH];
    if (prependPath) {
        u.path(prependPath + '/' + u.path());
    }
    if (SELECTORS in opts) {
        let setSelectors = opts[SELECTORS];
        if (setSelectors) {
            if (!Array.isArray(setSelectors)) {
                setSelectors = setSelectors.split('.');
            }
            selectors = setSelectors;
        } else {
            selectors = [];
        }
    }
    let addSelectors = opts[ADD_SELECTORS];
    if (addSelectors) {
        if (!Array.isArray(addSelectors)) {
            addSelectors = addSelectors.split('.');
        }
        addSelectors.forEach(s => {
            selectors.push(s);
        });
    }
    let removeSelectors = opts[REMOVE_SELECTORS];
    if (removeSelectors) {
        if (!Array.isArray(removeSelectors)) {
            removeSelectors = removeSelectors.split('.');
        }
        removeSelectors.forEach(s => {
            const idx = selectors.indexOf(s);
            if (idx >= 0) {
                selectors.splice(idx, 1);
            }
        });
    }
    if (EXTENSION in opts) {
        extension = opts[EXTENSION] || '';
        if (extension && extension[0] !== '.') {
            extension = '.' + extension;
        }
    }
    if (SUFFIX in opts) {
        suffix = opts[SUFFIX] || '';
    }
    const addSuffix = opts[APPEND_SUFFIX];
    if (addSuffix) {
        suffix += '/' + addSuffix;
    }
    const prependSuffix = opts[PREPEND_SUFFIX];
    if (prependSuffix) {
        suffix = prependSuffix + '/' + suffix;
    }
    if (suffix && suffix[0] !== '/') {
        suffix = '/' + suffix;
    }
    if (QUERY in opts) {
        const qry = opts[QUERY];
        if (!qry) {
            u.query('');
        } else {
            u.query(qry);
        }
    }
    const addQuery = opts[ADD_QUERY];
    if (addQuery) {
        const merged = {...u.query(true), ...addQuery};
        u.query(merged);
    }
    const removeQuery = opts[REMOVE_QUERY];
    if (removeQuery) {
        const qry = u.query(true);
        if (Array.isArray(removeQuery)) {
            removeQuery.forEach(q => delete qry[q]);
        } else {
            delete qry[removeQuery];
        }
        u.query(qry)
    }
    if (FRAGMENT in opts) {
        u.fragment(opts[FRAGMENT] || '');
    }
    selectorString = selectors.length > 0 ? '.' + selectors.join('.') : '';
    u.path(u.path() + selectorString + extension + suffix);
    return u.normalizePath().toString();
};

