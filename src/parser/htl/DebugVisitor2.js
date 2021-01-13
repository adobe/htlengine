/*
 * Copyright 2021 Adobe. All rights reserved.
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
 * Visitor that recreates the parsed text and stores it in {@code result}.
 * @type {module.DebugVisitor}
 */
module.exports = class DebugVisitor2 {
  constructor() {
    this.result = '';
  }

  visit(node) {
    if (!node) {
      return;
    }
    const { type, children = [] } = node;
    if (node.wrapped) {
      this.result += '(';
    }
    switch (type) {
      case 'htl': {
        node.children.forEach((child) => {
          if (child.type === 'expression') {
            this.visit(child);
          } else {
            this.result += `${child.value}`;
          }
        });
        break;
      }
      case 'array': {
        this.result += '[';
        children.forEach((child, idx) => {
          if (idx > 0) {
            this.result += ', ';
          }
          this.visit(child);
        });
        this.result += ']';
        break;
      }
      case 'access': {
        this.visit(children[0]);
        this.result += '[';
        this.visit(children[1]);
        this.result += ']';
        break;
      }
      case 'binary': {
        children.forEach((child, idx) => {
          if (idx > 0) {
            this.result += node.op;
          }
          this.visit(child);
        });
        break;
      }
      case 'comparison': {
        this.visit(children[0]);
        this.result += node.op;
        this.visit(children[1]);
        break;
      }
      case 'ternary': {
        this.visit(node.value);
        this.result += ' ? ';
        this.visit(children[0]);
        this.result += ' : ';
        this.visit(children[1]);
        break;
      }
      case 'unary': {
        this.result += node.op;
        this.visit(node.value);
        break;
      }
      case 'expression': {
        this.result += '${';
        children.forEach((child) => {
          this.visit(child);
        });
        this.result += '}';
        break;
      }
      case 'options': {
        children.forEach((child, idx) => {
          if (idx === 0) {
            this.result += ' @ ';
          } else {
            this.result += ', ';
          }
          this.visit(child);
        });
        break;
      }
      case 'option': {
        this.result += node.value;
        if (children.length) {
          this.result += '=';
          this.visit(children[0]);
        }
        break;
      }
      case 'ident': {
        this.result += node.value;
        break;
      }
      case 'number': {
        this.result += node.value;
        break;
      }
      case 'string': {
        this.result += `'${node.value}'`;
        break;
      }
      case 'bool': {
        this.result += node.value;
        break;
      }
      default: {
        throw new Error(`unexpected node: ${node.type}`);
      }
    }
    if (node.wrapped) {
      this.result += ')';
    }
  }
};
