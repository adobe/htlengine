// Generated from src/parser/grammar/HTMLParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var HTMLParserListener = require('./HTMLParserListener').HTMLParserListener;
var grammarFileName = "HTMLParser.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003$\u00cb\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0003\u0002\u0003\u0002\u0007\u0002-\n\u0002",
    "\f\u0002\u000e\u00020\u000b\u0002\u0003\u0002\u0005\u00023\n\u0002\u0003",
    "\u0002\u0003\u0002\u0007\u00027\n\u0002\f\u0002\u000e\u0002:\u000b\u0002",
    "\u0003\u0002\u0007\u0002=\n\u0002\f\u0002\u000e\u0002@\u000b\u0002\u0003",
    "\u0003\u0007\u0003C\n\u0003\f\u0003\u000e\u0003F\u000b\u0003\u0003\u0003",
    "\u0003\u0003\u0007\u0003J\n\u0003\f\u0003\u000e\u0003M\u000b\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0007\u0004T",
    "\n\u0004\f\u0004\u000e\u0004W\u000b\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004_\n\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0007\u0004f",
    "\n\u0004\f\u0004\u000e\u0004i\u000b\u0004\u0003\u0004\u0003\u0004\u0005",
    "\u0004m\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005r\n\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "y\n\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0005\u0007\u0080\n\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005",
    "\b\u0087\n\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b",
    "\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f",
    "\u0003\u000f\u0005\u000f\u0097\n\u000f\u0003\u0010\u0003\u0010\u0003",
    "\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003",
    "\u0014\u0003\u0014\u0006\u0014\u00a3\n\u0014\r\u0014\u000e\u0014\u00a4",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0006\u0014",
    "\u00ac\n\u0014\r\u0014\u000e\u0014\u00ad\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0005\u0014\u00b4\n\u0014\u0003\u0015\u0003\u0015",
    "\u0006\u0015\u00b8\n\u0015\r\u0015\u000e\u0015\u00b9\u0003\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0006\u0015\u00c1\n\u0015",
    "\r\u0015\u000e\u0015\u00c2\u0003\u0015\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0005\u0015\u00c9\n\u0015\u0003\u0015\u0002\u0002\u0016\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
    " \"$&(\u0002\u0004\u0004\u0002\b\b\u000e\u000e\u0003\u0002\u0003\u0004",
    "\u0002\u00d3\u0002.\u0003\u0002\u0002\u0002\u0004D\u0003\u0002\u0002",
    "\u0002\u0006l\u0003\u0002\u0002\u0002\bq\u0003\u0002\u0002\u0002\nx",
    "\u0003\u0002\u0002\u0002\f\u007f\u0003\u0002\u0002\u0002\u000e\u0086",
    "\u0003\u0002\u0002\u0002\u0010\u0088\u0003\u0002\u0002\u0002\u0012\u008a",
    "\u0003\u0002\u0002\u0002\u0014\u008c\u0003\u0002\u0002\u0002\u0016\u008e",
    "\u0003\u0002\u0002\u0002\u0018\u0090\u0003\u0002\u0002\u0002\u001a\u0092",
    "\u0003\u0002\u0002\u0002\u001c\u0096\u0003\u0002\u0002\u0002\u001e\u0098",
    "\u0003\u0002\u0002\u0002 \u009a\u0003\u0002\u0002\u0002\"\u009c\u0003",
    "\u0002\u0002\u0002$\u009e\u0003\u0002\u0002\u0002&\u00b3\u0003\u0002",
    "\u0002\u0002(\u00c8\u0003\u0002\u0002\u0002*-\u0005\u001e\u0010\u0002",
    "+-\u0005\u001a\u000e\u0002,*\u0003\u0002\u0002\u0002,+\u0003\u0002\u0002",
    "\u0002-0\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002./\u0003\u0002",
    "\u0002\u0002/2\u0003\u0002\u0002\u00020.\u0003\u0002\u0002\u000213\u0005",
    "\"\u0012\u000221\u0003\u0002\u0002\u000223\u0003\u0002\u0002\u00023",
    "8\u0003\u0002\u0002\u000247\u0005\u001e\u0010\u000257\u0005\u001a\u000e",
    "\u000264\u0003\u0002\u0002\u000265\u0003\u0002\u0002\u00027:\u0003\u0002",
    "\u0002\u000286\u0003\u0002\u0002\u000289\u0003\u0002\u0002\u00029>\u0003",
    "\u0002\u0002\u0002:8\u0003\u0002\u0002\u0002;=\u0005\u0004\u0003\u0002",
    "<;\u0003\u0002\u0002\u0002=@\u0003\u0002\u0002\u0002><\u0003\u0002\u0002",
    "\u0002>?\u0003\u0002\u0002\u0002?\u0003\u0003\u0002\u0002\u0002@>\u0003",
    "\u0002\u0002\u0002AC\u0005\b\u0005\u0002BA\u0003\u0002\u0002\u0002C",
    "F\u0003\u0002\u0002\u0002DB\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002",
    "\u0002EG\u0003\u0002\u0002\u0002FD\u0003\u0002\u0002\u0002GK\u0005\u0006",
    "\u0004\u0002HJ\u0005\b\u0005\u0002IH\u0003\u0002\u0002\u0002JM\u0003",
    "\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002",
    "L\u0005\u0003\u0002\u0002\u0002MK\u0003\u0002\u0002\u0002Nm\u0005&\u0014",
    "\u0002Om\u0005(\u0015\u0002PQ\u0007\r\u0002\u0002QU\u0005\u0018\r\u0002",
    "RT\u0005\n\u0006\u0002SR\u0003\u0002\u0002\u0002TW\u0003\u0002\u0002",
    "\u0002US\u0003\u0002\u0002\u0002UV\u0003\u0002\u0002\u0002VX\u0003\u0002",
    "\u0002\u0002WU\u0003\u0002\u0002\u0002XY\u0007\u001b\u0002\u0002Ym\u0003",
    "\u0002\u0002\u0002Z[\u0007\r\u0002\u0002[\\\u0007\u001d\u0002\u0002",
    "\\^\u0005\u0018\r\u0002]_\u0007\b\u0002\u0002^]\u0003\u0002\u0002\u0002",
    "^_\u0003\u0002\u0002\u0002_`\u0003\u0002\u0002\u0002`a\u0007\u001b\u0002",
    "\u0002am\u0003\u0002\u0002\u0002bc\u0007\r\u0002\u0002cg\u0005\u0018",
    "\r\u0002df\u0005\n\u0006\u0002ed\u0003\u0002\u0002\u0002fi\u0003\u0002",
    "\u0002\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002\u0002\u0002hj\u0003",
    "\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002jk\u0007\u001c\u0002\u0002",
    "km\u0003\u0002\u0002\u0002lN\u0003\u0002\u0002\u0002lO\u0003\u0002\u0002",
    "\u0002lP\u0003\u0002\u0002\u0002lZ\u0003\u0002\u0002\u0002lb\u0003\u0002",
    "\u0002\u0002m\u0007\u0003\u0002\u0002\u0002nr\u0005\u001a\u000e\u0002",
    "or\u0005 \u0011\u0002pr\u0005\u001e\u0010\u0002qn\u0003\u0002\u0002",
    "\u0002qo\u0003\u0002\u0002\u0002qp\u0003\u0002\u0002\u0002r\t\u0003",
    "\u0002\u0002\u0002st\u0005\u0010\t\u0002tu\u0007\u001e\u0002\u0002u",
    "v\u0005\u0016\f\u0002vy\u0003\u0002\u0002\u0002wy\u0005\u0010\t\u0002",
    "xs\u0003\u0002\u0002\u0002xw\u0003\u0002\u0002\u0002y\u000b\u0003\u0002",
    "\u0002\u0002z{\u0005\u0012\n\u0002{|\u0007\u0012\u0002\u0002|}\u0005",
    "\u0016\f\u0002}\u0080\u0003\u0002\u0002\u0002~\u0080\u0005\u0012\n\u0002",
    "\u007fz\u0003\u0002\u0002\u0002\u007f~\u0003\u0002\u0002\u0002\u0080",
    "\r\u0003\u0002\u0002\u0002\u0081\u0082\u0005\u0014\u000b\u0002\u0082",
    "\u0083\u0007\u0018\u0002\u0002\u0083\u0084\u0005\u0016\f\u0002\u0084",
    "\u0087\u0003\u0002\u0002\u0002\u0085\u0087\u0005\u0014\u000b\u0002\u0086",
    "\u0081\u0003\u0002\u0002\u0002\u0086\u0085\u0003\u0002\u0002\u0002\u0087",
    "\u000f\u0003\u0002\u0002\u0002\u0088\u0089\u0007\u001f\u0002\u0002\u0089",
    "\u0011\u0003\u0002\u0002\u0002\u008a\u008b\u0007\u0013\u0002\u0002\u008b",
    "\u0013\u0003\u0002\u0002\u0002\u008c\u008d\u0007\u0019\u0002\u0002\u008d",
    "\u0015\u0003\u0002\u0002\u0002\u008e\u008f\u0007#\u0002\u0002\u008f",
    "\u0017\u0003\u0002\u0002\u0002\u0090\u0091\u0007\u001f\u0002\u0002\u0091",
    "\u0019\u0003\u0002\u0002\u0002\u0092\u0093\t\u0002\u0002\u0002\u0093",
    "\u001b\u0003\u0002\u0002\u0002\u0094\u0097\u0005\u001e\u0010\u0002\u0095",
    "\u0097\u0007\b\u0002\u0002\u0096\u0094\u0003\u0002\u0002\u0002\u0096",
    "\u0095\u0003\u0002\u0002\u0002\u0097\u001d\u0003\u0002\u0002\u0002\u0098",
    "\u0099\t\u0003\u0002\u0002\u0099\u001f\u0003\u0002\u0002\u0002\u009a",
    "\u009b\u0007\u0006\u0002\u0002\u009b!\u0003\u0002\u0002\u0002\u009c",
    "\u009d\u0007\u0007\u0002\u0002\u009d#\u0003\u0002\u0002\u0002\u009e",
    "\u009f\u0007\u0005\u0002\u0002\u009f%\u0003\u0002\u0002\u0002\u00a0",
    "\u00a2\u0007\t\u0002\u0002\u00a1\u00a3\u0005\f\u0007\u0002\u00a2\u00a1",
    "\u0003\u0002\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4\u00a2",
    "\u0003\u0002\u0002\u0002\u00a4\u00a5\u0003\u0002\u0002\u0002\u00a5\u00a6",
    "\u0003\u0002\u0002\u0002\u00a6\u00a7\u0007\u000f\u0002\u0002\u00a7\u00a8",
    "\u0007!\u0002\u0002\u00a8\u00b4\u0003\u0002\u0002\u0002\u00a9\u00ab",
    "\u0007\t\u0002\u0002\u00aa\u00ac\u0005\f\u0007\u0002\u00ab\u00aa\u0003",
    "\u0002\u0002\u0002\u00ac\u00ad\u0003\u0002\u0002\u0002\u00ad\u00ab\u0003",
    "\u0002\u0002\u0002\u00ad\u00ae\u0003\u0002\u0002\u0002\u00ae\u00af\u0003",
    "\u0002\u0002\u0002\u00af\u00b0\u0007\u0010\u0002\u0002\u00b0\u00b4\u0003",
    "\u0002\u0002\u0002\u00b1\u00b2\u0007\n\u0002\u0002\u00b2\u00b4\u0007",
    "!\u0002\u0002\u00b3\u00a0\u0003\u0002\u0002\u0002\u00b3\u00a9\u0003",
    "\u0002\u0002\u0002\u00b3\u00b1\u0003\u0002\u0002\u0002\u00b4\'\u0003",
    "\u0002\u0002\u0002\u00b5\u00b7\u0007\u000b\u0002\u0002\u00b6\u00b8\u0005",
    "\u000e\b\u0002\u00b7\u00b6\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003",
    "\u0002\u0002\u0002\u00b9\u00b7\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003",
    "\u0002\u0002\u0002\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb\u00bc\u0007",
    "\u0015\u0002\u0002\u00bc\u00bd\u0007\"\u0002\u0002\u00bd\u00c9\u0003",
    "\u0002\u0002\u0002\u00be\u00c0\u0007\u000b\u0002\u0002\u00bf\u00c1\u0005",
    "\u000e\b\u0002\u00c0\u00bf\u0003\u0002\u0002\u0002\u00c1\u00c2\u0003",
    "\u0002\u0002\u0002\u00c2\u00c0\u0003\u0002\u0002\u0002\u00c2\u00c3\u0003",
    "\u0002\u0002\u0002\u00c3\u00c4\u0003\u0002\u0002\u0002\u00c4\u00c5\u0007",
    "\u0016\u0002\u0002\u00c5\u00c9\u0003\u0002\u0002\u0002\u00c6\u00c7\u0007",
    "\f\u0002\u0002\u00c7\u00c9\u0007\"\u0002\u0002\u00c8\u00b5\u0003\u0002",
    "\u0002\u0002\u00c8\u00be\u0003\u0002\u0002\u0002\u00c8\u00c6\u0003\u0002",
    "\u0002\u0002\u00c9)\u0003\u0002\u0002\u0002\u0019,.268>DKU^glqx\u007f",
    "\u0086\u0096\u00a4\u00ad\u00b3\u00b9\u00c2\u00c8"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, null, null, null, "'<script '", 
                     "'<script>'", "'<style >'", "'<style>'", "'<'" ];

var symbolicNames = [ null, "HTML_COMMENT", "HTML_CONDITIONAL_COMMENT", 
                      "XML_DECLARATION", "CDATA", "DTD", "SEA_WS", "SCRIPT_OPEN", 
                      "SCRIPT_NOATTRS", "STYLE_OPEN", "STYLE_NOATTRS", "TAG_OPEN", 
                      "HTML_TEXT", "SCRIPT_TAG_CLOSE", "SCRIPT_TAG_SLASH_CLOSE", 
                      "SCRIPT_TAG_SLASH", "SCRIPT_TAG_EQUALS", "SCRIPT_TAG_NAME", 
                      "SCRIPT_TAG_WHITESPACE", "STYLE_TAG_CLOSE", "STYLE_TAG_SLASH_CLOSE", 
                      "STYLE_TAG_SLASH", "STYLE_TAG_EQUALS", "STYLE_TAG_NAME", 
                      "STYLE_TAG_WHITESPACE", "TAG_CLOSE", "TAG_SLASH_CLOSE", 
                      "TAG_SLASH", "TAG_EQUALS", "TAG_NAME", "TAG_WHITESPACE", 
                      "SCRIPT_BODY", "STYLE_BODY", "ATTVALUE_VALUE", "ATTRIBUTE" ];

var ruleNames =  [ "htmlDocument", "htmlElements", "htmlElement", "htmlContent", 
                   "htmlAttribute", "htmlScriptAttribute", "htmlStyleAttribute", 
                   "htmlAttributeName", "htmlScriptAttributeName", "htmlStyleAttributeName", 
                   "htmlAttributeValue", "htmlTagName", "htmlChardata", 
                   "htmlMisc", "htmlComment", "xhtmlCDATA", "dtd", "xml", 
                   "script", "style" ];

function HTMLParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

HTMLParser.prototype = Object.create(antlr4.Parser.prototype);
HTMLParser.prototype.constructor = HTMLParser;

Object.defineProperty(HTMLParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

HTMLParser.EOF = antlr4.Token.EOF;
HTMLParser.HTML_COMMENT = 1;
HTMLParser.HTML_CONDITIONAL_COMMENT = 2;
HTMLParser.XML_DECLARATION = 3;
HTMLParser.CDATA = 4;
HTMLParser.DTD = 5;
HTMLParser.SEA_WS = 6;
HTMLParser.SCRIPT_OPEN = 7;
HTMLParser.SCRIPT_NOATTRS = 8;
HTMLParser.STYLE_OPEN = 9;
HTMLParser.STYLE_NOATTRS = 10;
HTMLParser.TAG_OPEN = 11;
HTMLParser.HTML_TEXT = 12;
HTMLParser.SCRIPT_TAG_CLOSE = 13;
HTMLParser.SCRIPT_TAG_SLASH_CLOSE = 14;
HTMLParser.SCRIPT_TAG_SLASH = 15;
HTMLParser.SCRIPT_TAG_EQUALS = 16;
HTMLParser.SCRIPT_TAG_NAME = 17;
HTMLParser.SCRIPT_TAG_WHITESPACE = 18;
HTMLParser.STYLE_TAG_CLOSE = 19;
HTMLParser.STYLE_TAG_SLASH_CLOSE = 20;
HTMLParser.STYLE_TAG_SLASH = 21;
HTMLParser.STYLE_TAG_EQUALS = 22;
HTMLParser.STYLE_TAG_NAME = 23;
HTMLParser.STYLE_TAG_WHITESPACE = 24;
HTMLParser.TAG_CLOSE = 25;
HTMLParser.TAG_SLASH_CLOSE = 26;
HTMLParser.TAG_SLASH = 27;
HTMLParser.TAG_EQUALS = 28;
HTMLParser.TAG_NAME = 29;
HTMLParser.TAG_WHITESPACE = 30;
HTMLParser.SCRIPT_BODY = 31;
HTMLParser.STYLE_BODY = 32;
HTMLParser.ATTVALUE_VALUE = 33;
HTMLParser.ATTRIBUTE = 34;

HTMLParser.RULE_htmlDocument = 0;
HTMLParser.RULE_htmlElements = 1;
HTMLParser.RULE_htmlElement = 2;
HTMLParser.RULE_htmlContent = 3;
HTMLParser.RULE_htmlAttribute = 4;
HTMLParser.RULE_htmlScriptAttribute = 5;
HTMLParser.RULE_htmlStyleAttribute = 6;
HTMLParser.RULE_htmlAttributeName = 7;
HTMLParser.RULE_htmlScriptAttributeName = 8;
HTMLParser.RULE_htmlStyleAttributeName = 9;
HTMLParser.RULE_htmlAttributeValue = 10;
HTMLParser.RULE_htmlTagName = 11;
HTMLParser.RULE_htmlChardata = 12;
HTMLParser.RULE_htmlMisc = 13;
HTMLParser.RULE_htmlComment = 14;
HTMLParser.RULE_xhtmlCDATA = 15;
HTMLParser.RULE_dtd = 16;
HTMLParser.RULE_xml = 17;
HTMLParser.RULE_script = 18;
HTMLParser.RULE_style = 19;

function HtmlDocumentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlDocument;
    return this;
}

HtmlDocumentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlDocumentContext.prototype.constructor = HtmlDocumentContext;

HtmlDocumentContext.prototype.htmlComment = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlCommentContext);
    } else {
        return this.getTypedRuleContext(HtmlCommentContext,i);
    }
};

HtmlDocumentContext.prototype.htmlChardata = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlChardataContext);
    } else {
        return this.getTypedRuleContext(HtmlChardataContext,i);
    }
};

HtmlDocumentContext.prototype.dtd = function() {
    return this.getTypedRuleContext(DtdContext,0);
};

HtmlDocumentContext.prototype.htmlElements = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlElementsContext);
    } else {
        return this.getTypedRuleContext(HtmlElementsContext,i);
    }
};

HtmlDocumentContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlDocument(this);
	}
};

HtmlDocumentContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlDocument(this);
	}
};




HTMLParser.HtmlDocumentContext = HtmlDocumentContext;

HTMLParser.prototype.htmlDocument = function() {

    var localctx = new HtmlDocumentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, HTMLParser.RULE_htmlDocument);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 44;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 42;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case HTMLParser.HTML_COMMENT:
                case HTMLParser.HTML_CONDITIONAL_COMMENT:
                    this.state = 40;
                    this.htmlComment();
                    break;
                case HTMLParser.SEA_WS:
                case HTMLParser.HTML_TEXT:
                    this.state = 41;
                    this.htmlChardata();
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                } 
            }
            this.state = 46;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
        }

        this.state = 48;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HTMLParser.DTD) {
            this.state = 47;
            this.dtd();
        }

        this.state = 54;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 52;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case HTMLParser.HTML_COMMENT:
                case HTMLParser.HTML_CONDITIONAL_COMMENT:
                    this.state = 50;
                    this.htmlComment();
                    break;
                case HTMLParser.SEA_WS:
                case HTMLParser.HTML_TEXT:
                    this.state = 51;
                    this.htmlChardata();
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                } 
            }
            this.state = 56;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
        }

        this.state = 60;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HTMLParser.HTML_COMMENT) | (1 << HTMLParser.HTML_CONDITIONAL_COMMENT) | (1 << HTMLParser.CDATA) | (1 << HTMLParser.SEA_WS) | (1 << HTMLParser.SCRIPT_OPEN) | (1 << HTMLParser.SCRIPT_NOATTRS) | (1 << HTMLParser.STYLE_OPEN) | (1 << HTMLParser.STYLE_NOATTRS) | (1 << HTMLParser.TAG_OPEN) | (1 << HTMLParser.HTML_TEXT))) !== 0)) {
            this.state = 57;
            this.htmlElements();
            this.state = 62;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlElementsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlElements;
    return this;
}

HtmlElementsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlElementsContext.prototype.constructor = HtmlElementsContext;

HtmlElementsContext.prototype.htmlElement = function() {
    return this.getTypedRuleContext(HtmlElementContext,0);
};

HtmlElementsContext.prototype.htmlContent = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlContentContext);
    } else {
        return this.getTypedRuleContext(HtmlContentContext,i);
    }
};

HtmlElementsContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlElements(this);
	}
};

HtmlElementsContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlElements(this);
	}
};




HTMLParser.HtmlElementsContext = HtmlElementsContext;

HTMLParser.prototype.htmlElements = function() {

    var localctx = new HtmlElementsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, HTMLParser.RULE_htmlElements);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 66;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HTMLParser.HTML_COMMENT) | (1 << HTMLParser.HTML_CONDITIONAL_COMMENT) | (1 << HTMLParser.CDATA) | (1 << HTMLParser.SEA_WS) | (1 << HTMLParser.HTML_TEXT))) !== 0)) {
            this.state = 63;
            this.htmlContent();
            this.state = 68;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 69;
        this.htmlElement();
        this.state = 73;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 70;
                this.htmlContent(); 
            }
            this.state = 75;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlElementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlElement;
    return this;
}

HtmlElementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlElementContext.prototype.constructor = HtmlElementContext;

HtmlElementContext.prototype.script = function() {
    return this.getTypedRuleContext(ScriptContext,0);
};

HtmlElementContext.prototype.style = function() {
    return this.getTypedRuleContext(StyleContext,0);
};

HtmlElementContext.prototype.TAG_OPEN = function() {
    return this.getToken(HTMLParser.TAG_OPEN, 0);
};

HtmlElementContext.prototype.htmlTagName = function() {
    return this.getTypedRuleContext(HtmlTagNameContext,0);
};

HtmlElementContext.prototype.TAG_CLOSE = function() {
    return this.getToken(HTMLParser.TAG_CLOSE, 0);
};

HtmlElementContext.prototype.htmlAttribute = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlAttributeContext);
    } else {
        return this.getTypedRuleContext(HtmlAttributeContext,i);
    }
};

HtmlElementContext.prototype.TAG_SLASH = function() {
    return this.getToken(HTMLParser.TAG_SLASH, 0);
};

HtmlElementContext.prototype.SEA_WS = function() {
    return this.getToken(HTMLParser.SEA_WS, 0);
};

HtmlElementContext.prototype.TAG_SLASH_CLOSE = function() {
    return this.getToken(HTMLParser.TAG_SLASH_CLOSE, 0);
};

HtmlElementContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlElement(this);
	}
};

HtmlElementContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlElement(this);
	}
};




HTMLParser.HtmlElementContext = HtmlElementContext;

HTMLParser.prototype.htmlElement = function() {

    var localctx = new HtmlElementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, HTMLParser.RULE_htmlElement);
    var _la = 0; // Token type
    try {
        this.state = 106;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 76;
            this.script();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 77;
            this.style();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 78;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 79;
            this.htmlTagName();
            this.state = 83;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HTMLParser.TAG_NAME) {
                this.state = 80;
                this.htmlAttribute();
                this.state = 85;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 86;
            this.match(HTMLParser.TAG_CLOSE);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 88;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 89;
            this.match(HTMLParser.TAG_SLASH);
            this.state = 90;
            this.htmlTagName();
            this.state = 92;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===HTMLParser.SEA_WS) {
                this.state = 91;
                this.match(HTMLParser.SEA_WS);
            }

            this.state = 94;
            this.match(HTMLParser.TAG_CLOSE);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 96;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 97;
            this.htmlTagName();
            this.state = 101;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HTMLParser.TAG_NAME) {
                this.state = 98;
                this.htmlAttribute();
                this.state = 103;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 104;
            this.match(HTMLParser.TAG_SLASH_CLOSE);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlContentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlContent;
    return this;
}

HtmlContentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlContentContext.prototype.constructor = HtmlContentContext;

HtmlContentContext.prototype.htmlChardata = function() {
    return this.getTypedRuleContext(HtmlChardataContext,0);
};

HtmlContentContext.prototype.xhtmlCDATA = function() {
    return this.getTypedRuleContext(XhtmlCDATAContext,0);
};

HtmlContentContext.prototype.htmlComment = function() {
    return this.getTypedRuleContext(HtmlCommentContext,0);
};

HtmlContentContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlContent(this);
	}
};

HtmlContentContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlContent(this);
	}
};




HTMLParser.HtmlContentContext = HtmlContentContext;

HTMLParser.prototype.htmlContent = function() {

    var localctx = new HtmlContentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, HTMLParser.RULE_htmlContent);
    try {
        this.state = 111;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HTMLParser.SEA_WS:
        case HTMLParser.HTML_TEXT:
            this.enterOuterAlt(localctx, 1);
            this.state = 108;
            this.htmlChardata();
            break;
        case HTMLParser.CDATA:
            this.enterOuterAlt(localctx, 2);
            this.state = 109;
            this.xhtmlCDATA();
            break;
        case HTMLParser.HTML_COMMENT:
        case HTMLParser.HTML_CONDITIONAL_COMMENT:
            this.enterOuterAlt(localctx, 3);
            this.state = 110;
            this.htmlComment();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlAttributeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlAttribute;
    return this;
}

HtmlAttributeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlAttributeContext.prototype.constructor = HtmlAttributeContext;

HtmlAttributeContext.prototype.htmlAttributeName = function() {
    return this.getTypedRuleContext(HtmlAttributeNameContext,0);
};

HtmlAttributeContext.prototype.TAG_EQUALS = function() {
    return this.getToken(HTMLParser.TAG_EQUALS, 0);
};

HtmlAttributeContext.prototype.htmlAttributeValue = function() {
    return this.getTypedRuleContext(HtmlAttributeValueContext,0);
};

HtmlAttributeContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlAttribute(this);
	}
};

HtmlAttributeContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlAttribute(this);
	}
};




HTMLParser.HtmlAttributeContext = HtmlAttributeContext;

HTMLParser.prototype.htmlAttribute = function() {

    var localctx = new HtmlAttributeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, HTMLParser.RULE_htmlAttribute);
    try {
        this.state = 118;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 113;
            this.htmlAttributeName();
            this.state = 114;
            this.match(HTMLParser.TAG_EQUALS);
            this.state = 115;
            this.htmlAttributeValue();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 117;
            this.htmlAttributeName();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlScriptAttributeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlScriptAttribute;
    return this;
}

HtmlScriptAttributeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlScriptAttributeContext.prototype.constructor = HtmlScriptAttributeContext;

HtmlScriptAttributeContext.prototype.htmlScriptAttributeName = function() {
    return this.getTypedRuleContext(HtmlScriptAttributeNameContext,0);
};

HtmlScriptAttributeContext.prototype.SCRIPT_TAG_EQUALS = function() {
    return this.getToken(HTMLParser.SCRIPT_TAG_EQUALS, 0);
};

HtmlScriptAttributeContext.prototype.htmlAttributeValue = function() {
    return this.getTypedRuleContext(HtmlAttributeValueContext,0);
};

HtmlScriptAttributeContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlScriptAttribute(this);
	}
};

HtmlScriptAttributeContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlScriptAttribute(this);
	}
};




HTMLParser.HtmlScriptAttributeContext = HtmlScriptAttributeContext;

HTMLParser.prototype.htmlScriptAttribute = function() {

    var localctx = new HtmlScriptAttributeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, HTMLParser.RULE_htmlScriptAttribute);
    try {
        this.state = 125;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 120;
            this.htmlScriptAttributeName();
            this.state = 121;
            this.match(HTMLParser.SCRIPT_TAG_EQUALS);
            this.state = 122;
            this.htmlAttributeValue();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 124;
            this.htmlScriptAttributeName();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlStyleAttributeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlStyleAttribute;
    return this;
}

HtmlStyleAttributeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlStyleAttributeContext.prototype.constructor = HtmlStyleAttributeContext;

HtmlStyleAttributeContext.prototype.htmlStyleAttributeName = function() {
    return this.getTypedRuleContext(HtmlStyleAttributeNameContext,0);
};

HtmlStyleAttributeContext.prototype.STYLE_TAG_EQUALS = function() {
    return this.getToken(HTMLParser.STYLE_TAG_EQUALS, 0);
};

HtmlStyleAttributeContext.prototype.htmlAttributeValue = function() {
    return this.getTypedRuleContext(HtmlAttributeValueContext,0);
};

HtmlStyleAttributeContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlStyleAttribute(this);
	}
};

HtmlStyleAttributeContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlStyleAttribute(this);
	}
};




HTMLParser.HtmlStyleAttributeContext = HtmlStyleAttributeContext;

HTMLParser.prototype.htmlStyleAttribute = function() {

    var localctx = new HtmlStyleAttributeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, HTMLParser.RULE_htmlStyleAttribute);
    try {
        this.state = 132;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 127;
            this.htmlStyleAttributeName();
            this.state = 128;
            this.match(HTMLParser.STYLE_TAG_EQUALS);
            this.state = 129;
            this.htmlAttributeValue();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 131;
            this.htmlStyleAttributeName();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlAttributeNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlAttributeName;
    return this;
}

HtmlAttributeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlAttributeNameContext.prototype.constructor = HtmlAttributeNameContext;

HtmlAttributeNameContext.prototype.TAG_NAME = function() {
    return this.getToken(HTMLParser.TAG_NAME, 0);
};

HtmlAttributeNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlAttributeName(this);
	}
};

HtmlAttributeNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlAttributeName(this);
	}
};




HTMLParser.HtmlAttributeNameContext = HtmlAttributeNameContext;

HTMLParser.prototype.htmlAttributeName = function() {

    var localctx = new HtmlAttributeNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, HTMLParser.RULE_htmlAttributeName);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 134;
        this.match(HTMLParser.TAG_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlScriptAttributeNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlScriptAttributeName;
    return this;
}

HtmlScriptAttributeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlScriptAttributeNameContext.prototype.constructor = HtmlScriptAttributeNameContext;

HtmlScriptAttributeNameContext.prototype.SCRIPT_TAG_NAME = function() {
    return this.getToken(HTMLParser.SCRIPT_TAG_NAME, 0);
};

HtmlScriptAttributeNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlScriptAttributeName(this);
	}
};

HtmlScriptAttributeNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlScriptAttributeName(this);
	}
};




HTMLParser.HtmlScriptAttributeNameContext = HtmlScriptAttributeNameContext;

HTMLParser.prototype.htmlScriptAttributeName = function() {

    var localctx = new HtmlScriptAttributeNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, HTMLParser.RULE_htmlScriptAttributeName);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 136;
        this.match(HTMLParser.SCRIPT_TAG_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlStyleAttributeNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlStyleAttributeName;
    return this;
}

HtmlStyleAttributeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlStyleAttributeNameContext.prototype.constructor = HtmlStyleAttributeNameContext;

HtmlStyleAttributeNameContext.prototype.STYLE_TAG_NAME = function() {
    return this.getToken(HTMLParser.STYLE_TAG_NAME, 0);
};

HtmlStyleAttributeNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlStyleAttributeName(this);
	}
};

HtmlStyleAttributeNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlStyleAttributeName(this);
	}
};




HTMLParser.HtmlStyleAttributeNameContext = HtmlStyleAttributeNameContext;

HTMLParser.prototype.htmlStyleAttributeName = function() {

    var localctx = new HtmlStyleAttributeNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, HTMLParser.RULE_htmlStyleAttributeName);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 138;
        this.match(HTMLParser.STYLE_TAG_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlAttributeValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlAttributeValue;
    return this;
}

HtmlAttributeValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlAttributeValueContext.prototype.constructor = HtmlAttributeValueContext;

HtmlAttributeValueContext.prototype.ATTVALUE_VALUE = function() {
    return this.getToken(HTMLParser.ATTVALUE_VALUE, 0);
};

HtmlAttributeValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlAttributeValue(this);
	}
};

HtmlAttributeValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlAttributeValue(this);
	}
};




HTMLParser.HtmlAttributeValueContext = HtmlAttributeValueContext;

HTMLParser.prototype.htmlAttributeValue = function() {

    var localctx = new HtmlAttributeValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, HTMLParser.RULE_htmlAttributeValue);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 140;
        this.match(HTMLParser.ATTVALUE_VALUE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlTagNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlTagName;
    return this;
}

HtmlTagNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlTagNameContext.prototype.constructor = HtmlTagNameContext;

HtmlTagNameContext.prototype.TAG_NAME = function() {
    return this.getToken(HTMLParser.TAG_NAME, 0);
};

HtmlTagNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlTagName(this);
	}
};

HtmlTagNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlTagName(this);
	}
};




HTMLParser.HtmlTagNameContext = HtmlTagNameContext;

HTMLParser.prototype.htmlTagName = function() {

    var localctx = new HtmlTagNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, HTMLParser.RULE_htmlTagName);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 142;
        this.match(HTMLParser.TAG_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlChardataContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlChardata;
    return this;
}

HtmlChardataContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlChardataContext.prototype.constructor = HtmlChardataContext;

HtmlChardataContext.prototype.HTML_TEXT = function() {
    return this.getToken(HTMLParser.HTML_TEXT, 0);
};

HtmlChardataContext.prototype.SEA_WS = function() {
    return this.getToken(HTMLParser.SEA_WS, 0);
};

HtmlChardataContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlChardata(this);
	}
};

HtmlChardataContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlChardata(this);
	}
};




HTMLParser.HtmlChardataContext = HtmlChardataContext;

HTMLParser.prototype.htmlChardata = function() {

    var localctx = new HtmlChardataContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, HTMLParser.RULE_htmlChardata);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 144;
        _la = this._input.LA(1);
        if(!(_la===HTMLParser.SEA_WS || _la===HTMLParser.HTML_TEXT)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlMiscContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlMisc;
    return this;
}

HtmlMiscContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlMiscContext.prototype.constructor = HtmlMiscContext;

HtmlMiscContext.prototype.htmlComment = function() {
    return this.getTypedRuleContext(HtmlCommentContext,0);
};

HtmlMiscContext.prototype.SEA_WS = function() {
    return this.getToken(HTMLParser.SEA_WS, 0);
};

HtmlMiscContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlMisc(this);
	}
};

HtmlMiscContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlMisc(this);
	}
};




HTMLParser.HtmlMiscContext = HtmlMiscContext;

HTMLParser.prototype.htmlMisc = function() {

    var localctx = new HtmlMiscContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, HTMLParser.RULE_htmlMisc);
    try {
        this.state = 148;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HTMLParser.HTML_COMMENT:
        case HTMLParser.HTML_CONDITIONAL_COMMENT:
            this.enterOuterAlt(localctx, 1);
            this.state = 146;
            this.htmlComment();
            break;
        case HTMLParser.SEA_WS:
            this.enterOuterAlt(localctx, 2);
            this.state = 147;
            this.match(HTMLParser.SEA_WS);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlCommentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlComment;
    return this;
}

HtmlCommentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlCommentContext.prototype.constructor = HtmlCommentContext;

HtmlCommentContext.prototype.HTML_COMMENT = function() {
    return this.getToken(HTMLParser.HTML_COMMENT, 0);
};

HtmlCommentContext.prototype.HTML_CONDITIONAL_COMMENT = function() {
    return this.getToken(HTMLParser.HTML_CONDITIONAL_COMMENT, 0);
};

HtmlCommentContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlComment(this);
	}
};

HtmlCommentContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlComment(this);
	}
};




HTMLParser.HtmlCommentContext = HtmlCommentContext;

HTMLParser.prototype.htmlComment = function() {

    var localctx = new HtmlCommentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, HTMLParser.RULE_htmlComment);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 150;
        _la = this._input.LA(1);
        if(!(_la===HTMLParser.HTML_COMMENT || _la===HTMLParser.HTML_CONDITIONAL_COMMENT)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function XhtmlCDATAContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_xhtmlCDATA;
    return this;
}

XhtmlCDATAContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
XhtmlCDATAContext.prototype.constructor = XhtmlCDATAContext;

XhtmlCDATAContext.prototype.CDATA = function() {
    return this.getToken(HTMLParser.CDATA, 0);
};

XhtmlCDATAContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterXhtmlCDATA(this);
	}
};

XhtmlCDATAContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitXhtmlCDATA(this);
	}
};




HTMLParser.XhtmlCDATAContext = XhtmlCDATAContext;

HTMLParser.prototype.xhtmlCDATA = function() {

    var localctx = new XhtmlCDATAContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, HTMLParser.RULE_xhtmlCDATA);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 152;
        this.match(HTMLParser.CDATA);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DtdContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_dtd;
    return this;
}

DtdContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DtdContext.prototype.constructor = DtdContext;

DtdContext.prototype.DTD = function() {
    return this.getToken(HTMLParser.DTD, 0);
};

DtdContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterDtd(this);
	}
};

DtdContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitDtd(this);
	}
};




HTMLParser.DtdContext = DtdContext;

HTMLParser.prototype.dtd = function() {

    var localctx = new DtdContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, HTMLParser.RULE_dtd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 154;
        this.match(HTMLParser.DTD);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function XmlContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_xml;
    return this;
}

XmlContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
XmlContext.prototype.constructor = XmlContext;

XmlContext.prototype.XML_DECLARATION = function() {
    return this.getToken(HTMLParser.XML_DECLARATION, 0);
};

XmlContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterXml(this);
	}
};

XmlContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitXml(this);
	}
};




HTMLParser.XmlContext = XmlContext;

HTMLParser.prototype.xml = function() {

    var localctx = new XmlContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, HTMLParser.RULE_xml);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 156;
        this.match(HTMLParser.XML_DECLARATION);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScriptContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_script;
    return this;
}

ScriptContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScriptContext.prototype.constructor = ScriptContext;

ScriptContext.prototype.SCRIPT_OPEN = function() {
    return this.getToken(HTMLParser.SCRIPT_OPEN, 0);
};

ScriptContext.prototype.SCRIPT_TAG_CLOSE = function() {
    return this.getToken(HTMLParser.SCRIPT_TAG_CLOSE, 0);
};

ScriptContext.prototype.SCRIPT_BODY = function() {
    return this.getToken(HTMLParser.SCRIPT_BODY, 0);
};

ScriptContext.prototype.htmlScriptAttribute = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlScriptAttributeContext);
    } else {
        return this.getTypedRuleContext(HtmlScriptAttributeContext,i);
    }
};

ScriptContext.prototype.SCRIPT_TAG_SLASH_CLOSE = function() {
    return this.getToken(HTMLParser.SCRIPT_TAG_SLASH_CLOSE, 0);
};

ScriptContext.prototype.SCRIPT_NOATTRS = function() {
    return this.getToken(HTMLParser.SCRIPT_NOATTRS, 0);
};

ScriptContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterScript(this);
	}
};

ScriptContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitScript(this);
	}
};




HTMLParser.ScriptContext = ScriptContext;

HTMLParser.prototype.script = function() {

    var localctx = new ScriptContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, HTMLParser.RULE_script);
    var _la = 0; // Token type
    try {
        this.state = 177;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 158;
            this.match(HTMLParser.SCRIPT_OPEN);
            this.state = 160; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 159;
                this.htmlScriptAttribute();
                this.state = 162; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===HTMLParser.SCRIPT_TAG_NAME);
            this.state = 164;
            this.match(HTMLParser.SCRIPT_TAG_CLOSE);
            this.state = 165;
            this.match(HTMLParser.SCRIPT_BODY);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 167;
            this.match(HTMLParser.SCRIPT_OPEN);
            this.state = 169; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 168;
                this.htmlScriptAttribute();
                this.state = 171; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===HTMLParser.SCRIPT_TAG_NAME);
            this.state = 173;
            this.match(HTMLParser.SCRIPT_TAG_SLASH_CLOSE);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 175;
            this.match(HTMLParser.SCRIPT_NOATTRS);
            this.state = 176;
            this.match(HTMLParser.SCRIPT_BODY);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StyleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_style;
    return this;
}

StyleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StyleContext.prototype.constructor = StyleContext;

StyleContext.prototype.STYLE_OPEN = function() {
    return this.getToken(HTMLParser.STYLE_OPEN, 0);
};

StyleContext.prototype.STYLE_TAG_CLOSE = function() {
    return this.getToken(HTMLParser.STYLE_TAG_CLOSE, 0);
};

StyleContext.prototype.STYLE_BODY = function() {
    return this.getToken(HTMLParser.STYLE_BODY, 0);
};

StyleContext.prototype.htmlStyleAttribute = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlStyleAttributeContext);
    } else {
        return this.getTypedRuleContext(HtmlStyleAttributeContext,i);
    }
};

StyleContext.prototype.STYLE_TAG_SLASH_CLOSE = function() {
    return this.getToken(HTMLParser.STYLE_TAG_SLASH_CLOSE, 0);
};

StyleContext.prototype.STYLE_NOATTRS = function() {
    return this.getToken(HTMLParser.STYLE_NOATTRS, 0);
};

StyleContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterStyle(this);
	}
};

StyleContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitStyle(this);
	}
};




HTMLParser.StyleContext = StyleContext;

HTMLParser.prototype.style = function() {

    var localctx = new StyleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, HTMLParser.RULE_style);
    var _la = 0; // Token type
    try {
        this.state = 198;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 179;
            this.match(HTMLParser.STYLE_OPEN);
            this.state = 181; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 180;
                this.htmlStyleAttribute();
                this.state = 183; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===HTMLParser.STYLE_TAG_NAME);
            this.state = 185;
            this.match(HTMLParser.STYLE_TAG_CLOSE);
            this.state = 186;
            this.match(HTMLParser.STYLE_BODY);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 188;
            this.match(HTMLParser.STYLE_OPEN);
            this.state = 190; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 189;
                this.htmlStyleAttribute();
                this.state = 192; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===HTMLParser.STYLE_TAG_NAME);
            this.state = 194;
            this.match(HTMLParser.STYLE_TAG_SLASH_CLOSE);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 196;
            this.match(HTMLParser.STYLE_NOATTRS);
            this.state = 197;
            this.match(HTMLParser.STYLE_BODY);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.HTMLParser = HTMLParser;
