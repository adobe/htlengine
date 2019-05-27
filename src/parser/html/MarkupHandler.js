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

const ElementContext = require('./ElementContext');
const ExpressionTransformer = require('./ExpressionTransformer');
const ExpressionContext = require('./ExpressionContext');
const SymbolGenerator = require('./SymbolGenerator');
const MarkupContext = require('./MarkupContext');
const HTLParser = require('../htl/HTLParser');
const ThrowingErrorListener = require('../htl/ThrowingErrorListener');
const Identifier = require('../htl/nodes/Identifier');
const BinaryOperation = require('../htl/nodes/BinaryOperation');
const BinaryOperator = require('../htl/nodes/BinaryOperator');
const StringConstant = require('../htl/nodes/StringConstant');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const MultiOperation = require('../htl/nodes/MultiOperation');

const OutText = require('../commands/OutText');
const Doctype = require('../commands/Doctype');
const Comment = require('../commands/Comment');
const CreateElement = require('../commands/CreateElement');
const PushElement = require('../commands/PushElement');
const PopElement = require('../commands/PopElement');
const AddAttribute = require('../commands/AddAttribute');
const VariableBinding = require('../commands/VariableBinding');
const Conditional = require('../commands/Conditional');
const OutputVariable = require('../commands/OutputVariable');
const PluginSignature = require('./PluginSignature');
const PluginContext = require('./PluginContext');

/* eslint-disable global-require */
const PLUGINS = {
  text: require('../plugins/TextPlugin'),
  list: require('../plugins/ListPlugin'),
  repeat: require('../plugins/ListPlugin'),
  test: require('../plugins/TestPlugin'),
  unwrap: require('../plugins/UnwrapPlugin'),
  attribute: require('../plugins/AttributePlugin'),
  use: require('../plugins/UsePlugin'),
  resource: require('../plugins/ResourcePlugin'),
  template: require('../plugins/TemplatePlugin'),
  call: require('../plugins/CallPlugin'),
  element: require('../plugins/ElementPlugin'),
};
/* eslint-enable global-require */

const SLY_COMMENT_PREFIX = '/*';
const SLY_COMMENT_SUFFIX = '*/';

module.exports = class MarkupHandler {
  constructor(stream) {
    this._stream = stream;
    this._htlParser = new HTLParser().withErrorListener(ThrowingErrorListener.INSTANCE);
    this._transformer = new ExpressionTransformer();
    this._symbolGenerator = new SymbolGenerator();
  }

  onDocumentStart() {
    this._stack = [];
  }

  onDocumentEnd() {
    this._stream.close();
  }

  onOpenTagStart(tagName) {
    this._stack.push(new ElementContext(tagName));

    const tag = tagName.toLowerCase();
    this._inScriptOrStyle = tag === 'script' || tag === 'style';
  }

  onAttribute(name, value, quoteChar, line, column) {
    const context = this._stack[this._stack.length - 1];
    const signature = PluginSignature.fromAttribute(name);
    if (signature) {
      this._handlePlugin(name, signature, value, context, { line, column });
    } else {
      context.addAttribute(name, value, quoteChar, { line, column });
    }
  }

  onOpenTagEnd(isEmpty = false, isVoid = false) {
    // const markup = isEmpty ? '/>' : '>';
    const context = this._stack[this._stack.length - 1];
    const { plugin } = context;
    const stream = this._stream;
    this._inScriptOrStyle = false; // we never have nesting script or style tags.

    plugin.beforeElement(stream, context);
    if (context.isSlyTag) {
      stream.beginIgnore();
    }
    plugin.beforeTagOpen(stream, isEmpty, isVoid);
    // this._out(`<${context.tagName}`);
    this._stream.write(new CreateElement(context.tagName, isEmpty, isVoid));
    plugin.beforeAttributes(stream);
    this._emitAttributes(context, plugin);
    plugin.afterAttributes(stream);
    // this._out(markup);
    this._stream.write(new PushElement(context.tagName, isEmpty, isVoid));
    plugin.afterTagOpen(stream);
    if (context.isSlyTag) {
      stream.endIgnore();
    }
    plugin.beforeChildren(stream);

    if (isEmpty || isVoid) {
      this._onEndTag(isEmpty, isVoid);
    }
  }

  onCloseTag(tagName, isVoid) {
    if (!isVoid) {
      this._onEndTag(false, isVoid);
    }
  }

  _onEndTag(isEmpty, isVoid) {
    const context = this._stack.pop();
    const { plugin } = context;
    const stream = this._stream;
    plugin.afterChildren(stream);
    if (context.isSlyTag) {
      stream.beginIgnore();
    }
    plugin.beforeTagClose(stream, isEmpty, isVoid);
    this._stream.write(new PopElement(context.tagName, isEmpty, isVoid));
    plugin.afterTagClose(stream, isEmpty);
    if (context.isSlyTag) {
      stream.endIgnore();
    }
    plugin.afterElement(stream);
  }

  onText(text, line, column) {
    const markupContext = this._inScriptOrStyle ? MarkupContext.TEXT : MarkupContext.HTML;
    this._outText(text, markupContext, line, column);
  }

  onComment(markup, line, column) {
    const trimmed = markup ? markup.trim() : '';
    const isSlyComment = trimmed.startsWith(SLY_COMMENT_PREFIX)
      && trimmed.endsWith(SLY_COMMENT_SUFFIX);

    if (!isSlyComment) {
      this._outComment(markup, line, column);
    }
  }

  onDocType(markup, line, column) {
    // todo: respect proper name
    this._stream.write(new Doctype('html', '', '', { line, column }));
  }

  _handlePlugin(name, signature, value, context, location) {
    const expressionContext = ExpressionContext.getContextForPlugin(signature.name);
    const interpolation = this._htlParser.parse(value);
    const expr = this._transformer.transform(interpolation, null, expressionContext);

    const PluginClass = this._lookupPlugin(signature.name);
    const pluginContext = new PluginContext(this._symbolGenerator, this._transformer, this._stream);
    const plugin = new PluginClass(signature, pluginContext, expr, location);
    if (plugin.isValid()) {
      context.addPlugin(plugin);
      context.addPluginAttribute(name, signature, expr);
    }
  }

  _emitAttributes(context, plugin) {
    Object.values(context.attributes).forEach((attr) => {
      const { name: attrName, value, location } = attr;
      if (attr.callback) {
        plugin.beforeAttribute(this._stream, attrName);
        attr.callback(context, this._stream, attr);
        plugin.afterAttribute(this._stream, attrName);
      } else if (attr.signature) {
        plugin.onPluginCall(this._stream, attr.signature, attr.expression);
      } else if (value == null || typeof value === 'string') {
        this._emitAttribute(attrName, value, attr.quoteChar, plugin, location);
      }
    });
  }

  _emitAttribute(name, value, quoteChar, plugin, location) {
    plugin.beforeAttribute(this._stream, name);
    if (value == null) {
      this._emitSimpleTextAttribute(name, null, quoteChar, plugin);
    } else if (value.indexOf('${') >= 0) {
      const interpolation = this._htlParser.parse(value);
      const plainText = interpolation.getPlainText();
      if (plainText !== null) {
        this._emitSimpleTextAttribute(name, plainText, quoteChar, plugin);
      } else {
        this._emitExpressionAttribute(name, interpolation, quoteChar, plugin, location);
      }
    } else {
      this._emitSimpleTextAttribute(name, value, quoteChar, plugin);
    }
    plugin.afterAttribute(this._stream, name);
  }

  _emitSimpleTextAttribute(name, textValue) {
    this._stream.write(new AddAttribute(name, textValue));
  }

  _emitExpressionAttribute(name, interpolation, quoteChar, plugin, location) {
    // interpolation = attributeChecked(name, interpolation); todo!
    if (interpolation.length === 1) {
      this._emitSingleFragment(name, interpolation, quoteChar, plugin, location);
    } else {
      this._emitMultipleFragment(name, interpolation, quoteChar, plugin, location);
    }
  }

  _emitMultipleFragment(name, interpolation, quoteChar, plugin, location) {
    // Simplified algorithm for attribute output, which works when the interpolation is not of
    // size 1. In this case we are certain that the attribute value cannot be the boolean value
    // true, so we can skip this test altogether
    const stream = this._stream;
    const expression = this._transformer.transform(
      interpolation,
      MarkupContext.attributeContext(name),
      ExpressionContext.ATTRIBUTE,
    );
    const attrContent = this._symbolGenerator.next('attrContent');
    stream.write(new VariableBinding.Start(attrContent, expression.root));
    stream.write(new Conditional.Start(new BinaryOperation(
      BinaryOperator.OR,
      new Identifier(attrContent),
      new BinaryOperation(BinaryOperator.EQ, StringConstant.FALSE, new Identifier(attrContent)),
    ), false, location));
    stream.write(new AddAttribute(name, new OutputVariable(attrContent), quoteChar));
    stream.write(Conditional.END);
    stream.write(VariableBinding.END);
  }

  _emitSingleFragment(name, interpolation, quoteChar, plugin, location) {
    const stream = this._stream;
    const valueExpression = this._transformer.transform(
      interpolation,
      null,
      ExpressionContext.ATTRIBUTE,
    ); // raw expression
    const attrValue = this._symbolGenerator.next('attrValue'); // holds the raw attribute value
    const attrContent = this._symbolGenerator.next('attrContent'); // holds the escaped attribute value
    const markupContext = MarkupContext.attributeContext(name);
    const alreadyEscaped = false;
    const node = valueExpression.root;
    stream.write(new VariableBinding.Start(attrValue, node)); // attrValue = <expr>
    let shouldDisplayExp;
    if (!alreadyEscaped) {
      const contentExpression = valueExpression.withNode(new Identifier(attrValue));
      stream.write(new VariableBinding.Start(
        attrContent,
        this._adjustContext(contentExpression, markupContext, ExpressionContext.ATTRIBUTE).root,
      )); // attrContent = <expr>
      shouldDisplayExp = new BinaryOperation(
        BinaryOperator.OR,
        new Identifier(attrContent),
        new BinaryOperation(BinaryOperator.EQ, StringConstant.FALSE, new Identifier(attrValue)),
      );
    } else {
      shouldDisplayExp = new BinaryOperation(
        BinaryOperator.OR,
        new Identifier(attrValue),
        new BinaryOperation(BinaryOperator.EQ, StringConstant.FALSE, new Identifier(attrValue)),
      );
    }
    stream.write(new Conditional.Start(shouldDisplayExp, false, location)); // if (attrContent)

    if (!alreadyEscaped) {
      stream.write(new AddAttribute(name, new OutputVariable(attrContent), quoteChar));
    } else {
      stream.write(new AddAttribute(name, new OutputVariable(attrValue), quoteChar));
    }
    stream.write(Conditional.END); // end if (attrContent)
    if (!alreadyEscaped) {
      stream.write(VariableBinding.END); // end scope for attrContent
    }
    stream.write(VariableBinding.END); // end scope for attrValue
  }

  _outComment(content, line, column) {
    // skip HTL parser if no HTL expression in content
    if (!content || content.indexOf('${') < 0) {
      this._stream.write(new Comment(content));
      return;
    }
    const interpolation = this._htlParser.parse(content);
    const plainText = interpolation.getPlainText();
    if (plainText != null) {
      this._stream.write(new Comment(plainText));
    } else {
      const node = this._transformer.transform(
        interpolation,
        MarkupContext.COMMENT,
        ExpressionContext.TEXT,
      ).root;
      const variable = this._symbolGenerator.next();
      this._stream.write(new VariableBinding.Start(variable, node));
      // todo: location doesn't work correctly
      this._stream.write(new Comment(new OutputVariable(variable), { line, column }));
      this._stream.write(VariableBinding.END);
    }
  }

  _outText(content, markupContext, line, column) {
    // skip HTL parser if no HTL expression in content
    if (!content || content.indexOf('${') < 0) {
      this._out(content);
      return;
    }

    const location = { line, column };
    const interpolation = this._htlParser.parse(content);
    if (markupContext == null) {
      // interpolation = requireContext(interpolation); todo
    }
    const plainText = interpolation.getPlainText();
    if (plainText != null) {
      this._out(plainText);
    } else {
      const node = this._transformer.transform(
        interpolation,
        markupContext,
        ExpressionContext.TEXT,
      ).root;

      // increase line number in passed location for any preceding strings containing line feeds
      if (node instanceof MultiOperation) {
        node.operands.every((op) => {
          if (op instanceof StringConstant) {
            location.line += op.text.split('\n').length - 1;
            this._out(op.text);
          } else {
            const variable = this._symbolGenerator.next();
            this._stream.write(new VariableBinding.Start(variable, op));
            this._stream.write(new OutputVariable(variable, location));
            this._stream.write(VariableBinding.END);
          }
          return true;
        });
      } else {
        const variable = this._symbolGenerator.next();
        this._stream.write(new VariableBinding.Start(variable, node));
        this._stream.write(new OutputVariable(variable, location));
        this._stream.write(VariableBinding.END);
      }
    }
  }

  _out(text) {
    this._stream.write(new OutText(text));
  }

  _adjustContext(expression, markupContext, expressionContext) {
    const { root } = expression;
    if (root instanceof RuntimeCall) {
      if (root.functionName === 'xss') {
        return expression;
      }
    }
    return this._transformer.adjustToContext(expression, markupContext, expressionContext);
  }

  // eslint-disable-next-line class-methods-use-this
  _lookupPlugin(name) {
    // eslint-disable-next-line no-prototype-builtins
    if (PLUGINS.hasOwnProperty(name)) {
      return PLUGINS[name];
    }

    throw new Error(`Plugin not implemented: ${name}`);
  }
};
