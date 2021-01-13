@{%
lexer = require('../grammar/lexer.js');

function h(type, value, children, props = {}) {
  const node = {
    type,
    ...props,
  };
  if (value) {
    node.value = value;
  }
  if (children) {
    node.children = children;
  }
  return node;
}

function binaryList(op) {
  return (d) => {
    if (!d[1].length) {
      return d[0];
    }
    const children = [d[0]];
    d[1].forEach((s) => {
      children.push(s[3])
    });
    return {
      type: 'binary',
      op,
      children,
    }
  }
}

function expression(d) {
  return {
    type: 'expression',
    children: [d[2], d[3]],
  }
}

function array(d) {
  const list = d[2];
  const a = [];
  if (list) {
    a.push(list[0]);
    list[1].forEach((s) => a.push(s[3]));
  }
  return {
    type: 'array',
    children: a,
  }
}

function access(d) {
  let node = d[0];
  d[1].forEach((s) => {
    node = {
      type: 'access',
      children: [node, s],
    }
  });
  return node;
}

function optionList(d) {
  const children = [d[3]];
  d[4].forEach((s) => {
    children.push(s[3]);
  });
  return {
    type: 'options',
    children,
  }
}

function option(d) {
  return {
    type: 'option',
    value: d[0].value,
    children: d[1] ? [d[1][3]] : [],
  }
}
%}

@lexer lexer

interpolation -> ( textFrag | expression ):* {% d => h('htl', null, d[0].map((s) => s[0])) %}

textFrag -> %TEXT_PART:+ {% d => h('text', d.map((s) => s[0].value).join('')) %}

expression -> %EXPR_START _ exprNode:? optionList:? _ %EXPR_END {% expression %}

optionList -> _ %OPTION_SEP _ option (_ %COMMA _ option):* {% optionList %}

option -> %ID (_ %ASSIGN _ exprNode):? {% option %}

exprNode
    -> orBinaryOp _ %TERNARY_Q_OP _ orBinaryOp _ %TERNARY_BRANCHES_OP _ orBinaryOp {% d => h('ternary', d[0], [d[4], d[8]]) %}
    |  orBinaryOp {% id %}

orBinaryOp -> andBinaryOp (_ %OR_OP _ andBinaryOp):* {% binaryList('||') %}

andBinaryOp -> inBinaryOp (_ %AND_OP _ inBinaryOp):* {% binaryList('&&') %}

inBinaryOp -> comparisonTerm (_ %IN_OP _ comparisonTerm):* {% binaryList('in') %}

comparisonTerm
  -> factor {% id %}
  |  factor _ comparisonOp _ factor {% d => h('comparison', null, [d[0], d[4]], { op: d[2][0].value }) %}

comparisonOp -> %GT | %LT | %LEQ | %GEQ | %EQ | %NEQ

factor
  -> term {% id %}
  |  %NOT_OP _ term {% d => h('unary', d[2], [], { op: '!' }) %}

term
  -> simple
      ( %ARRAY_START _ exprNode _ %ARRAY_END {% d => d[2] %}
      | %DOT field {% d => d[1] %}
    ):* {% access %}

field -> %ID {% d => h('string', d[0].value, [], { quotes: '\'' }) %}

simple
    -> atom {% id %}
    |  %LBRACKET exprNode %RBRACKET {% d => { const exp = d[1]; exp.wrapped = true; return exp; } %}
    |  %ARRAY_START _ valueList:? _ %ARRAY_END {% array %}

valueList -> exprNode (_ %COMMA _ exprNode):*

atom
  -> (%D_STRING | %S_STRING) {% d => h('string', d[0][0].value, null, { quotes: d[0][0].text[0] }) %}
  |  %ID {% d => h('ident', d[0].value) %}
  |  (%FLOAT | %INT) {% d => h('number', Number.parseFloat(d[0][0].value)) %}
  |  %BOOL_CONSTANT {% d => h('bool', d[0].value === 'true') %}

_ -> (%WS|%COMMENT):*

