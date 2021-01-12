// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "interpolation$ebnf$1", "symbols": []},
    {"name": "interpolation$ebnf$1$subexpression$1", "symbols": ["textFrag"]},
    {"name": "interpolation$ebnf$1$subexpression$1", "symbols": ["expression"]},
    {"name": "interpolation$ebnf$1", "symbols": ["interpolation$ebnf$1", "interpolation$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "interpolation", "symbols": ["interpolation$ebnf$1"], "postprocess": d => d[0].map((s) => s[0])},
    {"name": "textFrag$ebnf$1", "symbols": [(lexer.has("TEXT_PART") ? {type: "TEXT_PART"} : TEXT_PART)]},
    {"name": "textFrag$ebnf$1", "symbols": ["textFrag$ebnf$1", (lexer.has("TEXT_PART") ? {type: "TEXT_PART"} : TEXT_PART)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "textFrag", "symbols": ["textFrag$ebnf$1"], "postprocess": d => h('text', d.map((s) => s[0].value).join(''))},
    {"name": "expression$ebnf$1", "symbols": ["exprNode"], "postprocess": id},
    {"name": "expression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "expression$ebnf$2", "symbols": ["optionList"], "postprocess": id},
    {"name": "expression$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "expression", "symbols": [(lexer.has("EXPR_START") ? {type: "EXPR_START"} : EXPR_START), "_", "expression$ebnf$1", "expression$ebnf$2", "_", (lexer.has("EXPR_END") ? {type: "EXPR_END"} : EXPR_END)], "postprocess": expression},
    {"name": "optionList$ebnf$1", "symbols": []},
    {"name": "optionList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("COMMA") ? {type: "COMMA"} : COMMA), "_", "option"]},
    {"name": "optionList$ebnf$1", "symbols": ["optionList$ebnf$1", "optionList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "optionList", "symbols": ["_", (lexer.has("OPTION_SEP") ? {type: "OPTION_SEP"} : OPTION_SEP), "_", "option", "optionList$ebnf$1"], "postprocess": optionList},
    {"name": "option$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("ASSIGN") ? {type: "ASSIGN"} : ASSIGN), "_", "exprNode"]},
    {"name": "option$ebnf$1", "symbols": ["option$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "option$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "option", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), "option$ebnf$1"], "postprocess": option},
    {"name": "exprNode", "symbols": ["orBinaryOp", "_", (lexer.has("TERNARY_Q_OP") ? {type: "TERNARY_Q_OP"} : TERNARY_Q_OP), "_", "orBinaryOp", "_", (lexer.has("TERNARY_BRANCHES_OP") ? {type: "TERNARY_BRANCHES_OP"} : TERNARY_BRANCHES_OP), "_", "orBinaryOp"], "postprocess": d => h('tenary', d[0], [d[4], d[8]])},
    {"name": "exprNode", "symbols": ["orBinaryOp"], "postprocess": id},
    {"name": "orBinaryOp$ebnf$1", "symbols": []},
    {"name": "orBinaryOp$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("OR_OP") ? {type: "OR_OP"} : OR_OP), "_", "andBinaryOp"]},
    {"name": "orBinaryOp$ebnf$1", "symbols": ["orBinaryOp$ebnf$1", "orBinaryOp$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "orBinaryOp", "symbols": ["andBinaryOp", "orBinaryOp$ebnf$1"], "postprocess": binaryList('or')},
    {"name": "andBinaryOp$ebnf$1", "symbols": []},
    {"name": "andBinaryOp$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("AND_OP") ? {type: "AND_OP"} : AND_OP), "_", "inBinaryOp"]},
    {"name": "andBinaryOp$ebnf$1", "symbols": ["andBinaryOp$ebnf$1", "andBinaryOp$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "andBinaryOp", "symbols": ["inBinaryOp", "andBinaryOp$ebnf$1"], "postprocess": binaryList('and')},
    {"name": "inBinaryOp$ebnf$1", "symbols": []},
    {"name": "inBinaryOp$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("IN_OP") ? {type: "IN_OP"} : IN_OP), "_", "comparisonTerm"]},
    {"name": "inBinaryOp$ebnf$1", "symbols": ["inBinaryOp$ebnf$1", "inBinaryOp$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "inBinaryOp", "symbols": ["comparisonTerm", "inBinaryOp$ebnf$1"], "postprocess": binaryList('in')},
    {"name": "comparisonTerm", "symbols": ["factor"], "postprocess": id},
    {"name": "comparisonTerm", "symbols": ["factor", "_", "comparisonOp", "_", "factor"], "postprocess": d => h('comparison', d[2][0].value, [d[0], d[4]])},
    {"name": "comparisonOp", "symbols": [(lexer.has("GT") ? {type: "GT"} : GT)]},
    {"name": "comparisonOp", "symbols": [(lexer.has("LT") ? {type: "LT"} : LT)]},
    {"name": "comparisonOp", "symbols": [(lexer.has("LEQ") ? {type: "LEQ"} : LEQ)]},
    {"name": "comparisonOp", "symbols": [(lexer.has("GEQ") ? {type: "GEQ"} : GEQ)]},
    {"name": "comparisonOp", "symbols": [(lexer.has("EQ") ? {type: "EQ"} : EQ)]},
    {"name": "comparisonOp", "symbols": [(lexer.has("NEQ") ? {type: "NEQ"} : NEQ)]},
    {"name": "factor", "symbols": ["term"], "postprocess": id},
    {"name": "factor", "symbols": [(lexer.has("NOT_OP") ? {type: "NOT_OP"} : NOT_OP), "_", "term"], "postprocess": d => h('not', d[2])},
    {"name": "term$ebnf$1", "symbols": []},
    {"name": "term$ebnf$1$subexpression$1", "symbols": [(lexer.has("ARRAY_START") ? {type: "ARRAY_START"} : ARRAY_START), "_", "exprNode", "_", (lexer.has("ARRAY_END") ? {type: "ARRAY_END"} : ARRAY_END)], "postprocess": d => d[2]},
    {"name": "term$ebnf$1$subexpression$1", "symbols": [(lexer.has("DOT") ? {type: "DOT"} : DOT), "field"], "postprocess": d => d[1]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", "term$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["simple", "term$ebnf$1"], "postprocess": term},
    {"name": "field", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID)], "postprocess": d => d[0].value},
    {"name": "simple", "symbols": ["atom"], "postprocess": id},
    {"name": "simple", "symbols": [(lexer.has("LBRACKET") ? {type: "LBRACKET"} : LBRACKET), "exprNode", (lexer.has("RBRACKET") ? {type: "RBRACKET"} : RBRACKET)], "postprocess": d => { const exp = d[1]; exp.wrapped = true; return exp; }},
    {"name": "simple$ebnf$1", "symbols": ["valueList"], "postprocess": id},
    {"name": "simple$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "simple", "symbols": [(lexer.has("ARRAY_START") ? {type: "ARRAY_START"} : ARRAY_START), "_", "simple$ebnf$1", "_", (lexer.has("ARRAY_END") ? {type: "ARRAY_END"} : ARRAY_END)], "postprocess": array},
    {"name": "valueList$ebnf$1", "symbols": []},
    {"name": "valueList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("COMMA") ? {type: "COMMA"} : COMMA), "_", "exprNode"]},
    {"name": "valueList$ebnf$1", "symbols": ["valueList$ebnf$1", "valueList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "valueList", "symbols": ["exprNode", "valueList$ebnf$1"]},
    {"name": "atom$subexpression$1", "symbols": [(lexer.has("D_STRING") ? {type: "D_STRING"} : D_STRING)]},
    {"name": "atom$subexpression$1", "symbols": [(lexer.has("S_STRING") ? {type: "S_STRING"} : S_STRING)]},
    {"name": "atom", "symbols": ["atom$subexpression$1"], "postprocess": d => h('string', d[0][0].value)},
    {"name": "atom", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID)], "postprocess": d => h('ident', d[0].value)},
    {"name": "atom$subexpression$2", "symbols": [(lexer.has("FLOAT") ? {type: "FLOAT"} : FLOAT)]},
    {"name": "atom$subexpression$2", "symbols": [(lexer.has("INT") ? {type: "INT"} : INT)]},
    {"name": "atom", "symbols": ["atom$subexpression$2"], "postprocess": d => h('number', Number.parseFloat(d[0][0].value))},
    {"name": "atom", "symbols": [(lexer.has("BOOL_CONSTANT") ? {type: "BOOL_CONSTANT"} : BOOL_CONSTANT)], "postprocess": d => h('bool', d[0].value === 'true')},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "interpolation"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
