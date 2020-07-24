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

/* eslint-disable max-len,no-unused-vars,max-classes-per-file */
const Plugin = require('../html/Plugin');
const VariableBinding = require('../commands/VariableBinding');
const Conditional = require('../commands/Conditional');
const OutputVariable = require('../commands/OutputVariable');
const AddAttribute = require('../commands/AddAttribute');
const Loop = require('../commands/Loop');
const MapLiteral = require('../htl/nodes/MapLiteral');
const PropertyAccess = require('../htl/nodes/PropertyAccess');
const BooleanConstant = require('../htl/nodes/BooleanConstant');
const BinaryOperation = require('../htl/nodes/BinaryOperation');
const BinaryOperator = require('../htl/nodes/BinaryOperator');
const UnaryOperation = require('../htl/nodes/UnaryOperation');
const UnaryOperator = require('../htl/nodes/UnaryOperator');
const StringConstant = require('../htl/nodes/StringConstant');
const RuntimeCall = require('../htl/nodes/RuntimeCall');
const Identifier = require('../htl/nodes/Identifier');
const Expression = require('../htl/nodes/Expression');
const ExpressionContext = require('../html/ExpressionContext');
const MarkupContext = require('../html/MarkupContext');

const REJECTLIST_ATTRIBUTE = /^(style|(on.*))$/;

function escapeNodeWithHint(ctx, node, markupContext, hint) {
  if (hint != null) {
    // todo: this is not the indicated way to escape via XSS. Correct after modifying the compiler context API
    return new RuntimeCall('xss', node, [new StringConstant(markupContext), hint]);
  }
  return ctx.adjustToContext(new Expression(node), markupContext, ExpressionContext.ATTRIBUTE).root;
}

function decodeAttributeName(signature) {
  if (signature.args.length > 0) {
    return signature.args.join('-');
  }
  return null;
}

class SingleAttributePlugin extends Plugin {
  constructor(signature, ctx, expression, attributeName, location) {
    super(signature, ctx, expression, location);
    this.attributeName = attributeName;
    this.attrValue = ctx.generateVariable(`attrValue_${attributeName}`);
    this.node = expression.root;
  }

  beforeElement(stream, elemContext) {
    elemContext.addCallbackAttribute(this.attributeName, () => {
      stream.write(new VariableBinding.Start(this.attrValue, this.node));
      stream.write(new Conditional.Start(new UnaryOperation(
        UnaryOperator.NOT,
        new UnaryOperation(
          UnaryOperator.IS_EMPTY,
          new Identifier(this.attrValue),
        ),
      ), false, this.location));
      stream.write(new AddAttribute(this.attributeName, new OutputVariable(this.attrValue)));
      stream.write(Conditional.END);
      stream.write(VariableBinding.END);
    });
  }
}

class MultiAttributePlugin extends Plugin {
  constructor(signature, ctx, expression, location) {
    super(signature, ctx, expression, location);

    this.attrMap = expression.root;
    this.attrMapVar = ctx.generateVariable('attrMap');
    this.beforeCall = true;
    this.ignored = {};
  }

  // eslint-disable-next-line class-methods-use-this
  beforeElement(stream, elemContext) {
  }

  beforeAttributes(stream) {
    stream.write(new VariableBinding.Start(this.attrMapVar, this.attrMap)); // attrMapVar =
  }

  beforeAttribute(stream, attributeName) {
    this.ignored[attributeName] = new BooleanConstant(true);
    if (this.beforeCall) {
      const attrNameVar = this.pluginContext.generateVariable(`attrName_${attributeName}`);
      const attrValue = this.pluginContext.generateVariable(`mapContains_${attributeName}`);
      stream.write(new VariableBinding.Start(attrNameVar, new StringConstant(attributeName))); // attrNameVar = ...
      stream.write(new VariableBinding.Start(attrValue, this._attributeValueNode(new StringConstant(attributeName)))); // attrValue = ...
      this._writeAttribute(stream, attrNameVar, attrValue);
      stream.write(new Conditional.Start(new BinaryOperation(BinaryOperator.EQ, new Identifier(attrValue), Identifier.NULL))); // if (mapContains != null)
    }
  }

  afterAttribute(stream, attributeName) {
    if (this.beforeCall) {
      stream.write(Conditional.END); // end: if (map contains != null)
      stream.write(VariableBinding.END); // end: attrVale = ...
      stream.write(VariableBinding.END); // end: attrNameVar = ...
    }
  }

  onPluginCall(stream, signature, expression) {
    if (signature.name === 'attribute') {
      const attrName = decodeAttributeName(signature);
      if (attrName == null) {
        this.beforeCall = false;
      } else if (!this.beforeCall) {
        this.ignored[attrName] = new BooleanConstant(true);
      }
    }
  }

  afterAttributes(stream) {
    const ctx = this.pluginContext;
    const ignoredLiteral = new MapLiteral(this.ignored);
    const ignoredVar = ctx.generateVariable('ignoredAttributes');
    const attrNameVar = ctx.generateVariable('attrName');
    const attrNameVarNode = new Identifier(attrNameVar);
    const attrNameEscaped = ctx.generateVariable('attrNameEscaped');
    const attrIndex = ctx.generateVariable('attrIndex');
    const attrContent = ctx.generateVariable('attrContent');

    stream.write(new VariableBinding.Start(ignoredVar, ignoredLiteral)); // ignoredVar = [];
    stream.write(new Loop.Start(this.attrMapVar, attrNameVar, attrIndex)); // for (attrNameVar in attrMapVar) {
    stream.write(new VariableBinding.Start(attrNameEscaped, this._escapeNode(attrNameVarNode, MarkupContext.ATTRIBUTE_NAME, null))); // attrNameEscaped = ...
    stream.write(new Conditional.Start(new Identifier(attrNameEscaped))); // if (attrNameEscaped) {
    stream.write(new Conditional.Start(new PropertyAccess(new Identifier(ignoredVar), attrNameVarNode), true)); // if (!ignored[attrName) {
    stream.write(new VariableBinding.Start(attrContent, this._attributeValueNode(attrNameVarNode))); // attrContent =

    this._writeAttribute(stream, attrNameEscaped, attrContent);

    stream.write(VariableBinding.END); // end: attrContent =
    stream.write(Conditional.END); // end: if (!ignored[attrName]
    stream.write(Conditional.END); // end: if (attrNameEscaped)
    stream.write(VariableBinding.END); // end: attrNameEscaped =
    stream.write(Loop.END); // end: for
    stream.write(VariableBinding.END); // end: ignoredVar

    stream.write(VariableBinding.END); // end: attrMapVar (created in beforeAttributes)
  }

  _writeAttribute(stream, attrNameVar, attrContentVar) {
    stream.write(new Conditional.Start(new UnaryOperation(
      UnaryOperator.NOT,
      new UnaryOperation(
        UnaryOperator.IS_EMPTY,
        new Identifier(attrContentVar),
      ),
    ), false, this.location));
    stream.write(new AddAttribute(new OutputVariable(attrNameVar), new OutputVariable(attrContentVar)));
    stream.write(Conditional.END);
  }

  _attributeValueNode(attributeNameNode) {
    return new PropertyAccess(new Identifier(this.attrMapVar), attributeNameNode);
  }

  _escapeNode(node, markupContext, hint) {
    return escapeNodeWithHint(this.pluginContext, node, markupContext, hint);
  }
}

module.exports = class AttributePlugin extends Plugin {
  constructor(signature, ctx, expression, location) {
    super(signature, ctx, expression);
    const attributeName = decodeAttributeName(signature);
    this.writeAtEnd = true;
    this.beforeCall = true;
    this.attributeName = attributeName;
    this.delegate = attributeName == null
      ? new MultiAttributePlugin(signature, ctx, expression, location)
      : new SingleAttributePlugin(signature, ctx, expression, attributeName, location);
  }

  isValid() {
    if (this.attributeName == null || !REJECTLIST_ATTRIBUTE.test(this.attributeName)) {
      return true;
    }
    const warningMessage = ''
            + `Sensible attribute (${this.attributeName}) detected: event attributes (on*) and the style attribute `
            + 'cannot be generated with the data-sly-attribute block element; if you need to output a dynamic value for '
            + 'this attribute then use an expression with an appropriate context.';
    this.pluginContext.stream.warn(warningMessage, this.expression.rawText);
    return false;
  }

  beforeElement() {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.beforeElement.apply(this.delegate, arguments);
  }

  beforeAttributes() {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.beforeAttributes.apply(this.delegate, arguments);
  }

  beforeAttribute(stream, attributeName) {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.beforeAttribute.apply(this.delegate, arguments);
  }

  beforeAttributeValue(stream, attributeName, attributeValue) {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.beforeAttributeValue.apply(this.delegate, arguments);
  }

  afterAttributeValue(stream, attributeName) {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.afterAttributeValue.apply(this.delegate, arguments);
  }

  afterAttribute(stream, attributeName) {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.afterAttribute.apply(this.delegate, arguments);
  }

  afterAttributes(stream) {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.afterAttributes.apply(this.delegate, arguments);
  }

  onPluginCall(stream) {
    // eslint-disable-next-line prefer-spread,prefer-rest-params
    this.delegate.onPluginCall.apply(this.delegate, arguments);
  }
};
