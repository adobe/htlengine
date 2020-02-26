// Generated from src/parser/grammar/SightlyParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by SightlyParser.
function SightlyParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

SightlyParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
SightlyParserListener.prototype.constructor = SightlyParserListener;

// Enter a parse tree produced by SightlyParser#interpolation.
SightlyParserListener.prototype.enterInterpolation = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#interpolation.
SightlyParserListener.prototype.exitInterpolation = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#textFrag.
SightlyParserListener.prototype.enterTextFrag = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#textFrag.
SightlyParserListener.prototype.exitTextFrag = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#expression.
SightlyParserListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#expression.
SightlyParserListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#optionList.
SightlyParserListener.prototype.enterOptionList = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#optionList.
SightlyParserListener.prototype.exitOptionList = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#option.
SightlyParserListener.prototype.enterOption = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#option.
SightlyParserListener.prototype.exitOption = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#exprNode.
SightlyParserListener.prototype.enterExprNode = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#exprNode.
SightlyParserListener.prototype.exitExprNode = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#orBinaryOp.
SightlyParserListener.prototype.enterOrBinaryOp = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#orBinaryOp.
SightlyParserListener.prototype.exitOrBinaryOp = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#andBinaryOp.
SightlyParserListener.prototype.enterAndBinaryOp = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#andBinaryOp.
SightlyParserListener.prototype.exitAndBinaryOp = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#inBinaryOp.
SightlyParserListener.prototype.enterInBinaryOp = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#inBinaryOp.
SightlyParserListener.prototype.exitInBinaryOp = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#comparisonTerm.
SightlyParserListener.prototype.enterComparisonTerm = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#comparisonTerm.
SightlyParserListener.prototype.exitComparisonTerm = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#comparisonOp.
SightlyParserListener.prototype.enterComparisonOp = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#comparisonOp.
SightlyParserListener.prototype.exitComparisonOp = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#factor.
SightlyParserListener.prototype.enterFactor = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#factor.
SightlyParserListener.prototype.exitFactor = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#term.
SightlyParserListener.prototype.enterTerm = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#term.
SightlyParserListener.prototype.exitTerm = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#field.
SightlyParserListener.prototype.enterField = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#field.
SightlyParserListener.prototype.exitField = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#simple.
SightlyParserListener.prototype.enterSimple = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#simple.
SightlyParserListener.prototype.exitSimple = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#valueList.
SightlyParserListener.prototype.enterValueList = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#valueList.
SightlyParserListener.prototype.exitValueList = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#atom.
SightlyParserListener.prototype.enterAtom = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#atom.
SightlyParserListener.prototype.exitAtom = function(ctx) {
};


// Enter a parse tree produced by SightlyParser#stringConst.
SightlyParserListener.prototype.enterStringConst = function(ctx) {
};

// Exit a parse tree produced by SightlyParser#stringConst.
SightlyParserListener.prototype.exitStringConst = function(ctx) {
};



exports.SightlyParserListener = SightlyParserListener;