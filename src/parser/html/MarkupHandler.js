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
const BooleanConstant = require('../htl/nodes/BooleanConstant');
const StringConstant = require('../htl/nodes/StringConstant');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const MultiOperation = require('../htl/nodes/MultiOperation');

const OutText = require('../commands/OutText');
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

const SLY_COMMENT_PREFIX = '<!--/*';
const SLY_COMMENT_SUFFIX = '*/-->';

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

  onOpenTagEnd(isEmpty, isVoid) {
    const markup = isEmpty ? '/>' : '>';
    const context = this._stack[this._stack.length - 1];
    const { plugin } = context;
    const stream = this._stream;
    this._inScriptOrStyle = false; // we never have nesting script or style tags.

    plugin.beforeElement(stream, context.tagName);
    if (context.isSlyTag) {
      stream.beginIgnore();
    }
    plugin.beforeTagOpen(stream);
    this._out(`<${context.tagName}`);
    plugin.beforeAttributes(stream);
    this._emitAttributes(context, plugin);
    plugin.afterAttributes(stream);
    this._out(markup);
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

  _onEndTag(isEmpty /* , isVoid */) {
    const context = this._stack.pop();
    const { plugin } = context;
    const stream = this._stream;
    plugin.afterChildren(stream);
    if (context.isSlyTag) {
      stream.beginIgnore();
    }
    plugin.beforeTagClose(stream, isEmpty);
    if (!isEmpty) {
      this._out(`</${context.tagName}>`);
    }
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
      this._outText(markup, MarkupContext.COMMENT, line, column);
    }
  }

  onDocType(markup, line, column) {
    this._outText(markup, MarkupContext.TEXT, line, column);
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
    context.attributes.forEach((attr) => {
      const { name: attrName, value, location } = attr;
      if (attr.signature) {
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

  _emitSimpleTextAttribute(name, textValue, quoteChar, plugin) {
    this._emitAttributeStart(name);
    plugin.beforeAttributeValue(this._stream, name, textValue);
    if (textValue != null) {
      this._emitAttributeValueStart(quoteChar);
      const quotedTextValue = textValue.replace(/"/g, '&quot;');
      this._out(quotedTextValue);
      this._emitAttributeEnd(quoteChar);
    }
    plugin.afterAttributeValue(this._stream, name);
  }

  _emitExpressionAttribute(name, interpolation, quoteChar, plugin, location) {
    // interpolation = attributeChecked(name, interpolation); todo!
    if (interpolation.length === 1) {
      this._emitSingleFragment(name, interpolation, quoteChar, plugin, location);
    } else {
      this._emitMultipleFragment(name, interpolation, quoteChar, plugin, location);
    }
  }

  _emitAttributeStart(name) {
    this._out(` ${name}`);
  }

  _emitAttributeValueStart(quoteChar) {
    const quote = quoteChar || '"';
    this._out(`=${quote}`);
  }

  _emitAttributeEnd(quoteChar) {
    const quote = quoteChar || '"';
    this._out(quote);
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
    this._emitAttributeStart(name);
    plugin.beforeAttributeValue(stream, name, expression.root);
    this._emitAttributeValueStart(quoteChar);
    stream.write(new OutputVariable(attrContent));
    this._emitAttributeEnd(quoteChar);
    plugin.afterAttributeValue(stream, name);
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
    // const isTrueVar = this._symbolGenerator.next('isTrueAttr');
    // const shouldDisplayAttr = this._symbolGenerator.next('shouldDisplayAttr');
    const markupContext = MarkupContext.attributeContext(name);
    const alreadyEscaped = false;
    // todo
    // if (valueExpression.root instanceof RuntimeCall) {
    //     RuntimeCall rc = (RuntimeCall) valueExpression.getRoot();
    //     if (RuntimeFunction.XSS.equals(rc.getFunctionName())) {
    //         alreadyEscaped = true;
    //     }
    // }
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

    this._emitAttributeStart(name); // write("attrName");
    plugin.beforeAttributeValue(stream, name, node);
    stream.write(new Conditional.Start(new BinaryOperation(
      BinaryOperator.STRICT_NEQ,
      new Identifier(attrValue),
      BooleanConstant.TRUE,
    ), false)); // if (attrValue !== true)
    this._emitAttributeValueStart(quoteChar); // write("='");
    if (!alreadyEscaped) {
      stream.write(new OutputVariable(attrContent)); // write(attrContent)
    } else {
      stream.write(new OutputVariable(attrValue)); // write(attrValue)
    }
    this._emitAttributeEnd(quoteChar); // write("'");
    stream.write(Conditional.END); // end if (!attrValue)
    plugin.afterAttributeValue(stream, name);
    stream.write(Conditional.END); // end if (attrContent)
    if (!alreadyEscaped) {
      stream.write(VariableBinding.END); // end scope for attrContent
    }
    stream.write(VariableBinding.END); // end scope for attrValue
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
            return true;
          }
          // no more strings so we have our final line number
          return false;
        });
      }

      const variable = this._symbolGenerator.next();
      this._stream.write(new VariableBinding.Start(variable, node));
      this._stream.write(new OutputVariable(variable, location));
      this._stream.write(VariableBinding.END);
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
