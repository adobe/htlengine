@{%
const lexer = require('../grammar/lexer.js');
const {
  interpolation,
  expression,
  options,
  ternary,
  binary,
  binaryOps,
  unary,
  unaryOps,
  access,
  string,
  array,
  ident,
  number,
  bool,
} = require('../grammar/handler.js');

function seq(arr, firstIdx, listIdx, itemIdx) {
  return [arr[firstIdx], ...arr[listIdx].map((s) => s[itemIdx])];
}

%}

@lexer lexer

interpolation -> ( textFrag | expression ):* %EOF {% d => interpolation(d[0]) %}

textFrag -> (%TEXT_PART | %ESC_EXPR | %DOLLAR):+ {% d => d[0].map((s) => s[0].value).join('') %}

expression -> %EXPR_START _ exprNode:? optionList:? _ %EXPR_END {% d => expression(d[2], d[3]) %}

optionList -> _ %OPTION_SEP _ option (_ %COMMA _ option):* {% d=> options(seq(d, 3, 4, 3)) %}

option -> %ID (_ %ASSIGN _ exprNode):? {% d => [d[0].value, d[1] ? d[1][3] : null] %}

exprNode
    -> orBinaryOp _ %TERNARY_Q_OP _ orBinaryOp _ %TERNARY_BRANCHES_OP _ orBinaryOp {% d => ternary(d[0], d[4], d[8]) %}
    |  orBinaryOp {% id %}

orBinaryOp -> andBinaryOp (_ %OR_OP _ andBinaryOp):* {% d => binary(binaryOps.OR, seq(d, 0, 1, 3)) %}

andBinaryOp -> inBinaryOp (_ %AND_OP _ inBinaryOp):* {% d => binary(binaryOps.AND, seq(d, 0, 1, 3)) %}

inBinaryOp -> comparisonTerm (_ %IN_OP _ comparisonTerm):* {% d => binary(binaryOps.IN, seq(d, 0, 1, 3)) %}

comparisonTerm
  -> factor {% id %}
  |  factor _ comparisonOp _ factor {% d => binary(d[2], [d[0], d[4]]) %}

comparisonOp
  -> %GT   {% d => binaryOps.GT  %}
  |  %LT   {% d => binaryOps.LT  %}
  |  %LEQ  {% d => binaryOps.LEQ %}
  |  %GEQ  {% d => binaryOps.GEQ %}
  |  %EQ   {% d => binaryOps.STRICT_EQ  %}
  |  %NEQ  {% d => binaryOps.STRICT_NEQ %}

factor
  -> term {% id %}
  |  %NOT_OP _ term {% d => unary(unaryOps.NOT, d[2]) %}

term
  -> simple
      ( %ARRAY_START _ exprNode _ %ARRAY_END {% d => d[2] %}
      | %DOT field {% d => d[1] %}
    ):* {% d => access(d[0], d[1]) %}

field -> %ID {% d => string(d[0].value) %}

simple
    -> atom {% id %}
    |  %LBRACKET exprNode %RBRACKET {% d => d[1].withHasParens(true) %}
    |  %ARRAY_START _ valueList:? _ %ARRAY_END {% d => array(d[2]) %}

valueList -> exprNode (_ %COMMA _ exprNode):* {% d => seq(d, 0, 1, 3) %}

atom
  -> (%D_STRING | %S_STRING) {% d => string(d[0][0].value) %}
  |  %ID {% d => ident(d[0].value) %}
  |  (%FLOAT | %INT) {% d => number(Number.parseFloat(d[0][0].value)) %}
  |  %BOOL_CONSTANT {% d => bool(d[0].value === 'true') %}

_ -> (%WS|%COMMENT):*
