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
const TemplateNode = require("./TemplateNode");

module.exports = class TemplateElementNode extends TemplateNode {
  /**
   *
   * @param {String} name name
   * @param {Boolean} hasEndSlash if tag has end slash
   * @param {TemplateAttribute[]} attributes The attributes
   */
  constructor(name, hasEndSlash, attributes) {
    super();
    this._hasEndElement = false;
    this._hasStartElement = false;
    this._attributes = attributes || [];
    this._children = [];
    this._name = name;
    this._hasEndSlash = hasEndSlash;
    this._attributes = attributes;
  }

  get name() {
    return this._name;
  }

  get hasEndSlash() {
    return this._hasEndSlash;
  }

  set hasEndSlash(value) {
    this._hasEndSlash = value;
  }

  get attributes() {
    return this._attributes;
  }

  get hasEndElement() {
    return this._hasEndElement;
  }

  set hasEndElement(value) {
    this._hasEndElement = value;
  }

  get hasStartElement() {
    return this._hasStartElement;
  }

  set hasStartElement(value) {
    this._hasStartElement = value;
  }

  get children() {
    return this._children;
  }

  addChild(node) {
    this._children.push(node);
  }
};
