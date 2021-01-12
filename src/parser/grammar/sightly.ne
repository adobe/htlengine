@{%
lexer = require('./lexer.js');

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
      children.push(s[1])
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
    node: d[1],
    opts: d[2],
  }
}

function comparison([d]) {
  if (d.length === 1) {
    return d[0];
  }
  return {
    type: 'comparison',
    op: d[1][0].value,
    children: [
      d[0],
      d[2],
    ],
  }
}

function array(d) {
  const list = d[1];
  const a = [];
  if (list) {
    a.push(list[0]);
    list[1].forEach((s) => a.push(s[1]));
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
  const children = [d[1]];
  opts[d[1].key] = d[1].value;
  d[2].forEach((s) => {
    opts[s[1].key] = s[1].value;
    children.push(s[1]);
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
    value: d[1] ? d[1][1].value : null,
  }
}
%}

@lexer lexer

interpolation -> ( textFrag | expression ):* {% d => d[0].map((s) => s[0]) %}

textFrag -> %TEXT_PART:+ {% d => h('text', d.map((s) => s[0].value).join('')) %}

expression -> %EXPR_START exprNode:? optionList:? %EXPR_END {% expression %}

optionList -> %OPTION_SEP option (%COMMA option):* {% optionList %}

option -> %ID (%ASSIGN exprNode):? {% option %}

exprNode
    -> orBinaryOp %TERNARY_Q_OP orBinaryOp %TERNARY_BRANCHES_OP orBinaryOp {% d => h('tenary', d[0], [d[2], d[4]]) %}
    |  orBinaryOp {% id %}

orBinaryOp -> andBinaryOp (%OR_OP andBinaryOp):* {% binaryList('or') %}

andBinaryOp -> inBinaryOp (%AND_OP inBinaryOp):* {% binaryList('and') %}

inBinaryOp -> comparisonTerm (%IN_OP comparisonTerm):* {% binaryList('in') %}

comparisonTerm -> (factor | factor comparisonOp factor) {% comparison %}

comparisonOp -> %GT | %LT | %LEQ | %GEQ | %EQ | %NEQ

factor
  -> term {% id %}
  |  %NOT_OP term {% d => h('not', d[1]) %}

term
  -> simple
      ( %ARRAY_START exprNode %ARRAY_END {% d => d[1] %}
      | %DOT field {% d => d[1] %}
    ):* {% term %}

field -> %ID {% d => d[0].value %}

simple
    -> atom {% id %}
    |  %LBRACKET exprNode %RBRACKET {% d => { const exp = d[1]; exp.wrapped = true; return exp; } %}
    |  %ARRAY_START valueList:? %ARRAY_END {% array %}

valueList -> exprNode (%COMMA exprNode):*

atom
  -> (%D_STRING | %S_STRING) {% d => h('string', d[0][0].value) %}
  |  %ID {% d => h('ident', d[0].value) %}
  |  (%FLOAT | %INT) {% d => h('number', Number.parseFloat(d[0][0].value)) %}
  |  %BOOL_CONSTANT {% d => h('bool', d[0].value === 'true') %}


__ -> %WS:+
_ -> %WS:*

