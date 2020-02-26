/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 ******************************************************************************/
parser grammar SightlyParser;

options {
    language = Javascript;
    tokenVocab = SightlyLexer;
}

@header {
    const NullLiteral = require('../htl/nodes/NullLiteral');
    const ArrayLiteral = require('../htl/nodes/ArrayLiteral');
    const NumericConstant = require('../htl/nodes/NumericConstant');
    const StringConstant = require('../htl/nodes/StringConstant');
    const BooleanConstant = require('../htl/nodes/BooleanConstant');
    const ExpressionNode = require('../htl/nodes/ExpressionNode');
    const PropertyAccess = require('../htl/nodes/PropertyAccess');
    const Expression = require('../htl/nodes/Expression');
    const Interpolation = require('../htl/nodes/Interpolation');
    const PropertyIdentifier = require('../htl/nodes/PropertyIdentifier');
    const BinaryOperator = require('../htl/nodes/BinaryOperator');
    const BinaryOperation = require('../htl/nodes/BinaryOperation');
    const UnaryOperator = require('../htl/nodes/UnaryOperator');
    const UnaryOperation = require('../htl/nodes/UnaryOperation');
    const TernaryOperation = require('../htl/nodes/TernaryOperation');
}

interpolation returns [Interpolation interp]
@init { $interp = new Interpolation(); }
    :    (
        textFrag { $interp.addText($textFrag.str); }
        | expression { $interp.addExpression($expression.expr.withRawText($expression.text)); }
        )* //perhaps too restrictive
    ;

textFrag returns [String str]
@init { let sb = ''; }
    :   (TEXT_PART { sb += $TEXT_PART.text; })+
        { $str = sb; }
    | (ESC_EXPR { sb += $ESC_EXPR.text; })+
        { $str = sb.substring(1); }
    ;

expression returns [Expression expr]
@init { let exNode = NullLiteral.INSTANCE; let opts = {}; }
    :   EXPR_START (exprNode {exNode = $exprNode.node;})?
        (OPTION_SEP optionList {opts = $optionList.options;})?
        EXPR_END
        { $expr = new Expression(exNode, opts); }
    ;


optionList returns [Map<String, ExpressionNode> options]
@init { $options = {}; }
    :    f=option { $options[$f.name] = ($f.value != null) ? $f.value : NullLiteral.INSTANCE; }
        (COMMA r=option { $options[$r.name]=$r.value; })*
    ;

option returns [String name, ExpressionNode value]
    :    ID { $name = $ID.text; } (ASSIGN exprNode { $value = $exprNode.node; } )?
    ;


exprNode returns [ExpressionNode node]
    :   condition=orBinaryOp TERNARY_Q_OP thenBranch=orBinaryOp TERNARY_BRANCHES_OP elseBranch=orBinaryOp
        {$node = new TernaryOperation($condition.node, $thenBranch.node, $elseBranch.node);}
    |   orBinaryOp {$node = $orBinaryOp.node;}
    ;

orBinaryOp returns [ExpressionNode node]
    :   left=andBinaryOp { $node = $left.node; }
        (OR_OP right=andBinaryOp { $node = new BinaryOperation(BinaryOperator.OR, $node, $right.node); })*
    ;

andBinaryOp returns [ExpressionNode node]
    :   left=inBinaryOp { $node = $left.node; }
        (AND_OP right=inBinaryOp { $node = new BinaryOperation(BinaryOperator.AND, $node, $right.node); })*
    ;

inBinaryOp returns [ExpressionNode node]
    :   left=comparisonTerm { $node = $left.node; }
        (IN_OP right=comparisonTerm { $node = new BinaryOperation(BinaryOperator.IN, $node, $right.node); })*
    ;

comparisonTerm returns [ExpressionNode node]
    :   factor { $node = $factor.node; }
    |   left=factor comparisonOp right=factor { $node = new BinaryOperation($comparisonOp.op, $left.node, $right.node); }
    ;

comparisonOp returns [BinaryOperator op]
    : GT { $op = BinaryOperator.GT; }
    | LT { $op = BinaryOperator.LT; }
    | LEQ { $op = BinaryOperator.LEQ; }
    | GEQ { $op = BinaryOperator.GEQ; }
    | EQ { $op = BinaryOperator.STRICT_EQ; }
    | NEQ { $op = BinaryOperator.STRICT_NEQ; }
    ;

factor returns [ExpressionNode node]
    :    (pa=term { $node = $pa.node; })
    |     (NOT_OP notTerm=term { $node = new UnaryOperation(UnaryOperator.NOT, $notTerm.node); })
    ;

term returns [ExpressionNode node]
    : simple { $node = $simple.node; }
        ( ARRAY_START exprNode ARRAY_END { $node = new PropertyAccess($node, $exprNode.node); }
        | DOT field { $node = new PropertyAccess($node, $field.node); })*
    ;

field returns [ExpressionNode node]
    : ID { $node = new StringConstant($ID.text); }
    ;

simple returns [ExpressionNode node]
    :    atom { $node = $atom.node; }
    |    LBRACKET exprNode RBRACKET { $node = $exprNode.node.withHasParens(true); }
    |   ARRAY_START valueList ARRAY_END { $node = new ArrayLiteral($valueList.values); }
    |   ARRAY_START ARRAY_END { $node = new ArrayLiteral([]); }
    ;

valueList returns [List<ExpressionNode> values]
@init { $values = []; }
    :    (f=exprNode { $values.push($f.node); }) (COMMA p=exprNode { $values.push($p.node); })*
    ;

atom returns [Atom node]
    :    stringConst { $node = $stringConst.node; }
    |    ID { $node = new PropertyIdentifier($ID.text); }
    |    numText=(FLOAT | INT) { $node = new NumericConstant($numText.text); }
    |    boolText=BOOL_CONSTANT { $node = new BooleanConstant($boolText.text); }
    ;

stringConst returns [StringConstant node]
    :   STRING { $node = StringConstant.parse($STRING.text); }
    ;
