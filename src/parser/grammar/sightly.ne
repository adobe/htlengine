@{%
lexer = require('../grammar/lexer.js');

function h(type, value, children = []) {
  return {
    type,
    value,
    children,
  }
}

function binaryList(type) {
  return (d) => {
    if (!d[1].length) {
      return d[0];
    }
    const children = [d[0]];
    d[1].forEach((s) => {
      children.push(s[3])
    });
    return {
      type,
      children,
    }
  }
}

function expression(d) {
  return {
    type: 'expression',
    value: d[2],
    opts: d[3],
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

function term(d) {
  let node = d[0];
  d[1].forEach((s) => {
    node = {
      type: 'prop',
      children: [node],
      value: s,
    }
  });
  return node;
  return {
    type: 'term',
    children: node,
  }
}

function optionList(d) {
  const opts = {};
  const children = [d[3]];
  opts[d[3].key] = d[3].value;
  d[4].forEach((s) => {
    opts[s[3].key] = s[3].value;
    children.push(s[3]);
  });
  return {
    type: 'options',
    value: opts,
    children,
  }
}

function option(d) {
  return {
    key: d[0].value,
    value: d[1] ? d[1][3].value : null,
  }
}
%}

@lexer lexer

interpolation -> ( textFrag | expression ):* {% d => d[0].map((s) => s[0]) %}

textFrag -> %TEXT_PART:+ {% d => h('text', d.map((s) => s[0].value).join('')) %}

expression -> %EXPR_START _ exprNode:? optionList:? _ %EXPR_END {% expression %}

optionList -> _ %OPTION_SEP _ option (_ %COMMA _ option):* {% optionList %}

option -> %ID (_ %ASSIGN _ exprNode):? {% option %}

exprNode
    -> orBinaryOp _ %TERNARY_Q_OP _ orBinaryOp _ %TERNARY_BRANCHES_OP _ orBinaryOp {% d => h('tenary', d[0], [d[4], d[8]]) %}
    |  orBinaryOp {% id %}

orBinaryOp -> andBinaryOp (_ %OR_OP _ andBinaryOp):* {% binaryList('or') %}

andBinaryOp -> inBinaryOp (_ %AND_OP _ inBinaryOp):* {% binaryList('and') %}

inBinaryOp -> comparisonTerm (_ %IN_OP _ comparisonTerm):* {% binaryList('in') %}

comparisonTerm
  -> factor {% id %}
  |  factor _ comparisonOp _ factor {% d => h('comparison', d[2][0].value, [d[0], d[4]]) %}

comparisonOp -> %GT | %LT | %LEQ | %GEQ | %EQ | %NEQ

factor
  -> term {% id %}
  |  %NOT_OP _ term {% d => h('not', d[2]) %}

term
  -> simple
      ( %ARRAY_START _ exprNode _ %ARRAY_END {% d => d[2] %}
      | %DOT field {% d => d[1] %}
    ):* {% term %}

field -> %ID {% d => d[0].value %}

simple
    -> atom {% id %}
    |  %LBRACKET exprNode %RBRACKET {% d => { const exp = d[1]; exp.wrapped = true; return exp; } %}
    |  %ARRAY_START _ valueList:? _ %ARRAY_END {% array %}

valueList -> exprNode (_ %COMMA _ exprNode):*

atom
  -> (%D_STRING | %S_STRING) {% d => h('string', d[0][0].value) %}
  |  %ID {% d => h('ident', d[0].value) %}
  |  (%FLOAT | %INT) {% d => h('number', Number.parseFloat(d[0][0].value)) %}
  |  %BOOL_CONSTANT {% d => h('bool', d[0].value === 'true') %}


__ -> %WS:+
_ -> %WS:*

