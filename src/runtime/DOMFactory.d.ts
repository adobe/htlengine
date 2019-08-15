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
/**
 * The DOM Factory create a HTML DOM when the compiled HTL script is executed.
 * @type {DOMFactory}
 */
export interface DOMFactory {
  /**
   * Starts the document and returns the root node.
   * @return {*} root node
   */
  start(): any;

  /**
   * Finalizes the document and returns its representation.
   * @return {*} the final document
   */
  end(): any;

  /**
   * Adds a DOCTYPE to the current node.
   * @param {*} node Current node
   * @param {string} text Doctype text
   */
  doctype(node: any, text: string);

  /**
   * Adds a text node to the current node
   * @param {*} node Current node
   * @param {string} text The text
   */
  text(node: any, text: string);

  /**
   * Adds a comment node to the current node
   * @param {*} node Current node
   * @param {string} text The text
   */
  rem(node: any, text: string);

  /**
   * Appends the give {@code value} to the given node.
   * The value can be either a string or a similar DOM object.
   * @param {*} node Current node.
   * @param {*} value Value or object to append.
   * @return {*} The resulting appended dom element
   */
  append(node: any, value: string): any;

  /**
   * Creates a new node with the given name
   * @param {string} name element name
   */
  create(name: string): any;

  /**
   * Sets an attribute to the given node
   * @param {*} node Current node
   * @param {string} name Name of the attribute
   * @param {string} value Value of the attribute
   * @param {string} [context] optional attribute context
   */
  attr(node: any, name: string, value: string, context?: string);

  /**
   * Adds the `node` as child of the `parent` node.
   * @param {*} parent Parent node
   * @param {*} node Child node
   * @return {*} The added child node.
   */
  push(parent: any, node: any): any;

  /**
   * Returns the parent node of the given one.
   * @param {*} node Current node
   * @return {*} The parent node
   */
  pop(node: any): any;

}
