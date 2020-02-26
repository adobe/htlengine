// Generated from src/parser/grammar/SightlyParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var SightlyParserListener = require('./SightlyParserListener').SightlyParserListener;

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

var grammarFileName = "SightlyParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003!\u00f1\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002-",
    "\n\u0002\f\u0002\u000e\u00020\u000b\u0002\u0003\u0003\u0003\u0003\u0006",
    "\u00034\n\u0003\r\u0003\u000e\u00035\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0006\u0003;\n\u0003\r\u0003\u000e\u0003<\u0003\u0003\u0005\u0003@",
    "\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004",
    "F\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004",
    "L\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005W\n\u0005",
    "\f\u0005\u000e\u0005Z\u000b\u0005\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006b\n\u0006\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007n\n\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0007\bv\n\b\f\b\u000e\by\u000b\b",
    "\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0007\t\u0081\n\t\f",
    "\t\u000e\t\u0084\u000b\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0007\n\u008c\n\n\f\n\u000e\n\u008f\u000b\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0005\u000b\u0099\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\f\u00a7\n\f",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005\r\u00b0",
    "\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0007",
    "\u000e\u00bd\n\u000e\f\u000e\u000e\u000e\u00c0\u000b\u000e\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0005\u0010\u00d5\n\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0007\u0011\u00de\n\u0011",
    "\f\u0011\u000e\u0011\u00e1\u000b\u0011\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0005\u0012\u00ec\n\u0012\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0002\u0002\u0014\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012",
    "\u0014\u0016\u0018\u001a\u001c\u001e \"$\u0002\u0003\u0003\u0002\u001d",
    "\u001e\u0002\u00fb\u0002.\u0003\u0002\u0002\u0002\u0004?\u0003\u0002",
    "\u0002\u0002\u0006A\u0003\u0002\u0002\u0002\bP\u0003\u0002\u0002\u0002",
    "\n[\u0003\u0002\u0002\u0002\fm\u0003\u0002\u0002\u0002\u000eo\u0003",
    "\u0002\u0002\u0002\u0010z\u0003\u0002\u0002\u0002\u0012\u0085\u0003",
    "\u0002\u0002\u0002\u0014\u0098\u0003\u0002\u0002\u0002\u0016\u00a6\u0003",
    "\u0002\u0002\u0002\u0018\u00af\u0003\u0002\u0002\u0002\u001a\u00b1\u0003",
    "\u0002\u0002\u0002\u001c\u00c1\u0003\u0002\u0002\u0002\u001e\u00d4\u0003",
    "\u0002\u0002\u0002 \u00d6\u0003\u0002\u0002\u0002\"\u00eb\u0003\u0002",
    "\u0002\u0002$\u00ed\u0003\u0002\u0002\u0002&\'\u0005\u0004\u0003\u0002",
    "\'(\b\u0002\u0001\u0002(-\u0003\u0002\u0002\u0002)*\u0005\u0006\u0004",
    "\u0002*+\b\u0002\u0001\u0002+-\u0003\u0002\u0002\u0002,&\u0003\u0002",
    "\u0002\u0002,)\u0003\u0002\u0002\u0002-0\u0003\u0002\u0002\u0002.,\u0003",
    "\u0002\u0002\u0002./\u0003\u0002\u0002\u0002/\u0003\u0003\u0002\u0002",
    "\u00020.\u0003\u0002\u0002\u000212\u0007\u0005\u0002\u000224\b\u0003",
    "\u0001\u000231\u0003\u0002\u0002\u000245\u0003\u0002\u0002\u000253\u0003",
    "\u0002\u0002\u000256\u0003\u0002\u0002\u000267\u0003\u0002\u0002\u0002",
    "7@\b\u0003\u0001\u000289\u0007\u0003\u0002\u00029;\b\u0003\u0001\u0002",
    ":8\u0003\u0002\u0002\u0002;<\u0003\u0002\u0002\u0002<:\u0003\u0002\u0002",
    "\u0002<=\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002>@\b\u0003",
    "\u0001\u0002?3\u0003\u0002\u0002\u0002?:\u0003\u0002\u0002\u0002@\u0005",
    "\u0003\u0002\u0002\u0002AE\u0007\u0004\u0002\u0002BC\u0005\f\u0007\u0002",
    "CD\b\u0004\u0001\u0002DF\u0003\u0002\u0002\u0002EB\u0003\u0002\u0002",
    "\u0002EF\u0003\u0002\u0002\u0002FK\u0003\u0002\u0002\u0002GH\u0007\u0013",
    "\u0002\u0002HI\u0005\b\u0005\u0002IJ\b\u0004\u0001\u0002JL\u0003\u0002",
    "\u0002\u0002KG\u0003\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002LM\u0003",
    "\u0002\u0002\u0002MN\u0007\u0006\u0002\u0002NO\b\u0004\u0001\u0002O",
    "\u0007\u0003\u0002\u0002\u0002PQ\u0005\n\u0006\u0002QX\b\u0005\u0001",
    "\u0002RS\u0007\u000f\u0002\u0002ST\u0005\n\u0006\u0002TU\b\u0005\u0001",
    "\u0002UW\u0003\u0002\u0002\u0002VR\u0003\u0002\u0002\u0002WZ\u0003\u0002",
    "\u0002\u0002XV\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002Y\t",
    "\u0003\u0002\u0002\u0002ZX\u0003\u0002\u0002\u0002[\\\u0007\u001c\u0002",
    "\u0002\\a\b\u0006\u0001\u0002]^\u0007\u0012\u0002\u0002^_\u0005\f\u0007",
    "\u0002_`\b\u0006\u0001\u0002`b\u0003\u0002\u0002\u0002a]\u0003\u0002",
    "\u0002\u0002ab\u0003\u0002\u0002\u0002b\u000b\u0003\u0002\u0002\u0002",
    "cd\u0005\u000e\b\u0002de\u0007\u0014\u0002\u0002ef\u0005\u000e\b\u0002",
    "fg\u0007\u0015\u0002\u0002gh\u0005\u000e\b\u0002hi\b\u0007\u0001\u0002",
    "in\u0003\u0002\u0002\u0002jk\u0005\u000e\b\u0002kl\b\u0007\u0001\u0002",
    "ln\u0003\u0002\u0002\u0002mc\u0003\u0002\u0002\u0002mj\u0003\u0002\u0002",
    "\u0002n\r\u0003\u0002\u0002\u0002op\u0005\u0010\t\u0002pw\b\b\u0001",
    "\u0002qr\u0007\f\u0002\u0002rs\u0005\u0010\t\u0002st\b\b\u0001\u0002",
    "tv\u0003\u0002\u0002\u0002uq\u0003\u0002\u0002\u0002vy\u0003\u0002\u0002",
    "\u0002wu\u0003\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002x\u000f\u0003",
    "\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002z{\u0005\u0012\n\u0002{",
    "\u0082\b\t\u0001\u0002|}\u0007\u000b\u0002\u0002}~\u0005\u0012\n\u0002",
    "~\u007f\b\t\u0001\u0002\u007f\u0081\u0003\u0002\u0002\u0002\u0080|\u0003",
    "\u0002\u0002\u0002\u0081\u0084\u0003\u0002\u0002\u0002\u0082\u0080\u0003",
    "\u0002\u0002\u0002\u0082\u0083\u0003\u0002\u0002\u0002\u0083\u0011\u0003",
    "\u0002\u0002\u0002\u0084\u0082\u0003\u0002\u0002\u0002\u0085\u0086\u0005",
    "\u0014\u000b\u0002\u0086\u008d\b\n\u0001\u0002\u0087\u0088\u0007\u000e",
    "\u0002\u0002\u0088\u0089\u0005\u0014\u000b\u0002\u0089\u008a\b\n\u0001",
    "\u0002\u008a\u008c\u0003\u0002\u0002\u0002\u008b\u0087\u0003\u0002\u0002",
    "\u0002\u008c\u008f\u0003\u0002\u0002\u0002\u008d\u008b\u0003\u0002\u0002",
    "\u0002\u008d\u008e\u0003\u0002\u0002\u0002\u008e\u0013\u0003\u0002\u0002",
    "\u0002\u008f\u008d\u0003\u0002\u0002\u0002\u0090\u0091\u0005\u0018\r",
    "\u0002\u0091\u0092\b\u000b\u0001\u0002\u0092\u0099\u0003\u0002\u0002",
    "\u0002\u0093\u0094\u0005\u0018\r\u0002\u0094\u0095\u0005\u0016\f\u0002",
    "\u0095\u0096\u0005\u0018\r\u0002\u0096\u0097\b\u000b\u0001\u0002\u0097",
    "\u0099\u0003\u0002\u0002\u0002\u0098\u0090\u0003\u0002\u0002\u0002\u0098",
    "\u0093\u0003\u0002\u0002\u0002\u0099\u0015\u0003\u0002\u0002\u0002\u009a",
    "\u009b\u0007\u0019\u0002\u0002\u009b\u00a7\b\f\u0001\u0002\u009c\u009d",
    "\u0007\u0016\u0002\u0002\u009d\u00a7\b\f\u0001\u0002\u009e\u009f\u0007",
    "\u0017\u0002\u0002\u009f\u00a7\b\f\u0001\u0002\u00a0\u00a1\u0007\u0018",
    "\u0002\u0002\u00a1\u00a7\b\f\u0001\u0002\u00a2\u00a3\u0007\u001a\u0002",
    "\u0002\u00a3\u00a7\b\f\u0001\u0002\u00a4\u00a5\u0007\u001b\u0002\u0002",
    "\u00a5\u00a7\b\f\u0001\u0002\u00a6\u009a\u0003\u0002\u0002\u0002\u00a6",
    "\u009c\u0003\u0002\u0002\u0002\u00a6\u009e\u0003\u0002\u0002\u0002\u00a6",
    "\u00a0\u0003\u0002\u0002\u0002\u00a6\u00a2\u0003\u0002\u0002\u0002\u00a6",
    "\u00a4\u0003\u0002\u0002\u0002\u00a7\u0017\u0003\u0002\u0002\u0002\u00a8",
    "\u00a9\u0005\u001a\u000e\u0002\u00a9\u00aa\b\r\u0001\u0002\u00aa\u00b0",
    "\u0003\u0002\u0002\u0002\u00ab\u00ac\u0007\r\u0002\u0002\u00ac\u00ad",
    "\u0005\u001a\u000e\u0002\u00ad\u00ae\b\r\u0001\u0002\u00ae\u00b0\u0003",
    "\u0002\u0002\u0002\u00af\u00a8\u0003\u0002\u0002\u0002\u00af\u00ab\u0003",
    "\u0002\u0002\u0002\u00b0\u0019\u0003\u0002\u0002\u0002\u00b1\u00b2\u0005",
    "\u001e\u0010\u0002\u00b2\u00be\b\u000e\u0001\u0002\u00b3\u00b4\u0007",
    "\u0010\u0002\u0002\u00b4\u00b5\u0005\f\u0007\u0002\u00b5\u00b6\u0007",
    "\u0011\u0002\u0002\u00b6\u00b7\b\u000e\u0001\u0002\u00b7\u00bd\u0003",
    "\u0002\u0002\u0002\u00b8\u00b9\u0007\b\u0002\u0002\u00b9\u00ba\u0005",
    "\u001c\u000f\u0002\u00ba\u00bb\b\u000e\u0001\u0002\u00bb\u00bd\u0003",
    "\u0002\u0002\u0002\u00bc\u00b3\u0003\u0002\u0002\u0002\u00bc\u00b8\u0003",
    "\u0002\u0002\u0002\u00bd\u00c0\u0003\u0002\u0002\u0002\u00be\u00bc\u0003",
    "\u0002\u0002\u0002\u00be\u00bf\u0003\u0002\u0002\u0002\u00bf\u001b\u0003",
    "\u0002\u0002\u0002\u00c0\u00be\u0003\u0002\u0002\u0002\u00c1\u00c2\u0007",
    "\u001c\u0002\u0002\u00c2\u00c3\b\u000f\u0001\u0002\u00c3\u001d\u0003",
    "\u0002\u0002\u0002\u00c4\u00c5\u0005\"\u0012\u0002\u00c5\u00c6\b\u0010",
    "\u0001\u0002\u00c6\u00d5\u0003\u0002\u0002\u0002\u00c7\u00c8\u0007\t",
    "\u0002\u0002\u00c8\u00c9\u0005\f\u0007\u0002\u00c9\u00ca\u0007\n\u0002",
    "\u0002\u00ca\u00cb\b\u0010\u0001\u0002\u00cb\u00d5\u0003\u0002\u0002",
    "\u0002\u00cc\u00cd\u0007\u0010\u0002\u0002\u00cd\u00ce\u0005 \u0011",
    "\u0002\u00ce\u00cf\u0007\u0011\u0002\u0002\u00cf\u00d0\b\u0010\u0001",
    "\u0002\u00d0\u00d5\u0003\u0002\u0002\u0002\u00d1\u00d2\u0007\u0010\u0002",
    "\u0002\u00d2\u00d3\u0007\u0011\u0002\u0002\u00d3\u00d5\b\u0010\u0001",
    "\u0002\u00d4\u00c4\u0003\u0002\u0002\u0002\u00d4\u00c7\u0003\u0002\u0002",
    "\u0002\u00d4\u00cc\u0003\u0002\u0002\u0002\u00d4\u00d1\u0003\u0002\u0002",
    "\u0002\u00d5\u001f\u0003\u0002\u0002\u0002\u00d6\u00d7\u0005\f\u0007",
    "\u0002\u00d7\u00d8\b\u0011\u0001\u0002\u00d8\u00df\u0003\u0002\u0002",
    "\u0002\u00d9\u00da\u0007\u000f\u0002\u0002\u00da\u00db\u0005\f\u0007",
    "\u0002\u00db\u00dc\b\u0011\u0001\u0002\u00dc\u00de\u0003\u0002\u0002",
    "\u0002\u00dd\u00d9\u0003\u0002\u0002\u0002\u00de\u00e1\u0003\u0002\u0002",
    "\u0002\u00df\u00dd\u0003\u0002\u0002\u0002\u00df\u00e0\u0003\u0002\u0002",
    "\u0002\u00e0!\u0003\u0002\u0002\u0002\u00e1\u00df\u0003\u0002\u0002",
    "\u0002\u00e2\u00e3\u0005$\u0013\u0002\u00e3\u00e4\b\u0012\u0001\u0002",
    "\u00e4\u00ec\u0003\u0002\u0002\u0002\u00e5\u00e6\u0007\u001c\u0002\u0002",
    "\u00e6\u00ec\b\u0012\u0001\u0002\u00e7\u00e8\t\u0002\u0002\u0002\u00e8",
    "\u00ec\b\u0012\u0001\u0002\u00e9\u00ea\u0007\u0007\u0002\u0002\u00ea",
    "\u00ec\b\u0012\u0001\u0002\u00eb\u00e2\u0003\u0002\u0002\u0002\u00eb",
    "\u00e5\u0003\u0002\u0002\u0002\u00eb\u00e7\u0003\u0002\u0002\u0002\u00eb",
    "\u00e9\u0003\u0002\u0002\u0002\u00ec#\u0003\u0002\u0002\u0002\u00ed",
    "\u00ee\u0007!\u0002\u0002\u00ee\u00ef\b\u0013\u0001\u0002\u00ef%\u0003",
    "\u0002\u0002\u0002\u0017,.5<?EKXamw\u0082\u008d\u0098\u00a6\u00af\u00bc",
    "\u00be\u00d4\u00df\u00eb"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, "'${'", null, "'}'", null, "'.'", "'('", 
                     "')'", "'&&'", "'||'", "'!'", "'in'", "','", "'['", 
                     "']'", "'='", "'@'", "'?'", "':'", "'<'", "'<='", "'>='", 
                     "'>'", "'=='", "'!='" ];

var symbolicNames = [ null, "ESC_EXPR", "EXPR_START", "TEXT_PART", "EXPR_END", 
                      "BOOL_CONSTANT", "DOT", "LBRACKET", "RBRACKET", "AND_OP", 
                      "OR_OP", "NOT_OP", "IN_OP", "COMMA", "ARRAY_START", 
                      "ARRAY_END", "ASSIGN", "OPTION_SEP", "TERNARY_Q_OP", 
                      "TERNARY_BRANCHES_OP", "LT", "LEQ", "GEQ", "GT", "EQ", 
                      "NEQ", "ID", "INT", "FLOAT", "COMMENT", "WS", "STRING" ];

var ruleNames =  [ "interpolation", "textFrag", "expression", "optionList", 
                   "option", "exprNode", "orBinaryOp", "andBinaryOp", "inBinaryOp", 
                   "comparisonTerm", "comparisonOp", "factor", "term", "field", 
                   "simple", "valueList", "atom", "stringConst" ];

function SightlyParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

SightlyParser.prototype = Object.create(antlr4.Parser.prototype);
SightlyParser.prototype.constructor = SightlyParser;

Object.defineProperty(SightlyParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

SightlyParser.EOF = antlr4.Token.EOF;
SightlyParser.ESC_EXPR = 1;
SightlyParser.EXPR_START = 2;
SightlyParser.TEXT_PART = 3;
SightlyParser.EXPR_END = 4;
SightlyParser.BOOL_CONSTANT = 5;
SightlyParser.DOT = 6;
SightlyParser.LBRACKET = 7;
SightlyParser.RBRACKET = 8;
SightlyParser.AND_OP = 9;
SightlyParser.OR_OP = 10;
SightlyParser.NOT_OP = 11;
SightlyParser.IN_OP = 12;
SightlyParser.COMMA = 13;
SightlyParser.ARRAY_START = 14;
SightlyParser.ARRAY_END = 15;
SightlyParser.ASSIGN = 16;
SightlyParser.OPTION_SEP = 17;
SightlyParser.TERNARY_Q_OP = 18;
SightlyParser.TERNARY_BRANCHES_OP = 19;
SightlyParser.LT = 20;
SightlyParser.LEQ = 21;
SightlyParser.GEQ = 22;
SightlyParser.GT = 23;
SightlyParser.EQ = 24;
SightlyParser.NEQ = 25;
SightlyParser.ID = 26;
SightlyParser.INT = 27;
SightlyParser.FLOAT = 28;
SightlyParser.COMMENT = 29;
SightlyParser.WS = 30;
SightlyParser.STRING = 31;

SightlyParser.RULE_interpolation = 0;
SightlyParser.RULE_textFrag = 1;
SightlyParser.RULE_expression = 2;
SightlyParser.RULE_optionList = 3;
SightlyParser.RULE_option = 4;
SightlyParser.RULE_exprNode = 5;
SightlyParser.RULE_orBinaryOp = 6;
SightlyParser.RULE_andBinaryOp = 7;
SightlyParser.RULE_inBinaryOp = 8;
SightlyParser.RULE_comparisonTerm = 9;
SightlyParser.RULE_comparisonOp = 10;
SightlyParser.RULE_factor = 11;
SightlyParser.RULE_term = 12;
SightlyParser.RULE_field = 13;
SightlyParser.RULE_simple = 14;
SightlyParser.RULE_valueList = 15;
SightlyParser.RULE_atom = 16;
SightlyParser.RULE_stringConst = 17;


function InterpolationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_interpolation;
    this.interp = null
    this._textFrag = null; // TextFragContext
    this._expression = null; // ExpressionContext
    return this;
}

InterpolationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InterpolationContext.prototype.constructor = InterpolationContext;

InterpolationContext.prototype.textFrag = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(TextFragContext);
    } else {
        return this.getTypedRuleContext(TextFragContext,i);
    }
};

InterpolationContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

InterpolationContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterInterpolation(this);
	}
};

InterpolationContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitInterpolation(this);
	}
};




SightlyParser.InterpolationContext = InterpolationContext;

SightlyParser.prototype.interpolation = function() {

    var localctx = new InterpolationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, SightlyParser.RULE_interpolation);
     localctx.interp =  new Interpolation() 
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 44;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SightlyParser.ESC_EXPR) | (1 << SightlyParser.EXPR_START) | (1 << SightlyParser.TEXT_PART))) !== 0)) {
            this.state = 42;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case SightlyParser.ESC_EXPR:
            case SightlyParser.TEXT_PART:
                this.state = 36;
                localctx._textFrag = this.textFrag();
                 localctx.interp.addText(localctx._textFrag.str); 
                break;
            case SightlyParser.EXPR_START:
                this.state = 39;
                localctx._expression = this.expression();
                 localctx.interp.addExpression(localctx._expression.expr.withRawText((localctx._expression===null ? null : this._input.getText(new antlr4.Interval(localctx._expression.start,localctx._expression.stop))))); 
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 46;
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


function TextFragContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_textFrag;
    this.str = null
    this._TEXT_PART = null; // Token
    this._ESC_EXPR = null; // Token
    return this;
}

TextFragContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TextFragContext.prototype.constructor = TextFragContext;

TextFragContext.prototype.TEXT_PART = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.TEXT_PART);
    } else {
        return this.getToken(SightlyParser.TEXT_PART, i);
    }
};


TextFragContext.prototype.ESC_EXPR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.ESC_EXPR);
    } else {
        return this.getToken(SightlyParser.ESC_EXPR, i);
    }
};


TextFragContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterTextFrag(this);
	}
};

TextFragContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitTextFrag(this);
	}
};




SightlyParser.TextFragContext = TextFragContext;

SightlyParser.prototype.textFrag = function() {

    var localctx = new TextFragContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, SightlyParser.RULE_textFrag);
     let sb = ''; 
    try {
        this.state = 61;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SightlyParser.TEXT_PART:
            this.enterOuterAlt(localctx, 1);
            this.state = 49; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 47;
            		localctx._TEXT_PART = this.match(SightlyParser.TEXT_PART);
            		 sb += (localctx._TEXT_PART===null ? null : localctx._TEXT_PART.text); 
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 51; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,2, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
             localctx.str =  sb 
            break;
        case SightlyParser.ESC_EXPR:
            this.enterOuterAlt(localctx, 2);
            this.state = 56; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 54;
            		localctx._ESC_EXPR = this.match(SightlyParser.ESC_EXPR);
            		 sb += (localctx._ESC_EXPR===null ? null : localctx._ESC_EXPR.text); 
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 58; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,3, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
             localctx.str =  sb.substring(1) 
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


function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_expression;
    this.expr = null
    this._exprNode = null; // ExprNodeContext
    this._optionList = null; // OptionListContext
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.EXPR_START = function() {
    return this.getToken(SightlyParser.EXPR_START, 0);
};

ExpressionContext.prototype.EXPR_END = function() {
    return this.getToken(SightlyParser.EXPR_END, 0);
};

ExpressionContext.prototype.exprNode = function() {
    return this.getTypedRuleContext(ExprNodeContext,0);
};

ExpressionContext.prototype.OPTION_SEP = function() {
    return this.getToken(SightlyParser.OPTION_SEP, 0);
};

ExpressionContext.prototype.optionList = function() {
    return this.getTypedRuleContext(OptionListContext,0);
};

ExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitExpression(this);
	}
};




SightlyParser.ExpressionContext = ExpressionContext;

SightlyParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, SightlyParser.RULE_expression);
     let exNode = NullLiteral.INSTANCE; let opts = {}; 
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 63;
        this.match(SightlyParser.EXPR_START);
        this.state = 67;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SightlyParser.BOOL_CONSTANT) | (1 << SightlyParser.LBRACKET) | (1 << SightlyParser.NOT_OP) | (1 << SightlyParser.ARRAY_START) | (1 << SightlyParser.ID) | (1 << SightlyParser.INT) | (1 << SightlyParser.FLOAT) | (1 << SightlyParser.STRING))) !== 0)) {
            this.state = 64;
            localctx._exprNode = this.exprNode();
            exNode = localctx._exprNode.node;
        }

        this.state = 73;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SightlyParser.OPTION_SEP) {
            this.state = 69;
            this.match(SightlyParser.OPTION_SEP);
            this.state = 70;
            localctx._optionList = this.optionList();
            opts = localctx._optionList.options;
        }

        this.state = 75;
        this.match(SightlyParser.EXPR_END);
         localctx.expr =  new Expression(exNode, opts) 
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


function OptionListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_optionList;
    this.options = null
    this.f = null; // OptionContext
    this.r = null; // OptionContext
    return this;
}

OptionListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OptionListContext.prototype.constructor = OptionListContext;

OptionListContext.prototype.option = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(OptionContext);
    } else {
        return this.getTypedRuleContext(OptionContext,i);
    }
};

OptionListContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.COMMA);
    } else {
        return this.getToken(SightlyParser.COMMA, i);
    }
};


OptionListContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterOptionList(this);
	}
};

OptionListContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitOptionList(this);
	}
};




SightlyParser.OptionListContext = OptionListContext;

SightlyParser.prototype.optionList = function() {

    var localctx = new OptionListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, SightlyParser.RULE_optionList);
     localctx.options =  {} 
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 78;
        localctx.f = this.option();
         localctx.options[localctx.f.name] = (localctx.f.value != null) ? localctx.f.value : NullLiteral.INSTANCE; 
        this.state = 86;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SightlyParser.COMMA) {
            this.state = 80;
            this.match(SightlyParser.COMMA);
            this.state = 81;
            localctx.r = this.option();
             localctx.options[localctx.r.name]=localctx.r.value; 
            this.state = 88;
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


function OptionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_option;
    this.name = null
    this.value = null
    this._ID = null; // Token
    this._exprNode = null; // ExprNodeContext
    return this;
}

OptionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OptionContext.prototype.constructor = OptionContext;

OptionContext.prototype.ID = function() {
    return this.getToken(SightlyParser.ID, 0);
};

OptionContext.prototype.ASSIGN = function() {
    return this.getToken(SightlyParser.ASSIGN, 0);
};

OptionContext.prototype.exprNode = function() {
    return this.getTypedRuleContext(ExprNodeContext,0);
};

OptionContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterOption(this);
	}
};

OptionContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitOption(this);
	}
};




SightlyParser.OptionContext = OptionContext;

SightlyParser.prototype.option = function() {

    var localctx = new OptionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, SightlyParser.RULE_option);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 89;
        localctx._ID = this.match(SightlyParser.ID);
         localctx.name =  (localctx._ID===null ? null : localctx._ID.text) 
        this.state = 95;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SightlyParser.ASSIGN) {
            this.state = 91;
            this.match(SightlyParser.ASSIGN);
            this.state = 92;
            localctx._exprNode = this.exprNode();
             localctx.value =  localctx._exprNode.node 
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


function ExprNodeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_exprNode;
    this.node = null
    this.condition = null; // OrBinaryOpContext
    this.thenBranch = null; // OrBinaryOpContext
    this.elseBranch = null; // OrBinaryOpContext
    this._orBinaryOp = null; // OrBinaryOpContext
    return this;
}

ExprNodeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprNodeContext.prototype.constructor = ExprNodeContext;

ExprNodeContext.prototype.TERNARY_Q_OP = function() {
    return this.getToken(SightlyParser.TERNARY_Q_OP, 0);
};

ExprNodeContext.prototype.TERNARY_BRANCHES_OP = function() {
    return this.getToken(SightlyParser.TERNARY_BRANCHES_OP, 0);
};

ExprNodeContext.prototype.orBinaryOp = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(OrBinaryOpContext);
    } else {
        return this.getTypedRuleContext(OrBinaryOpContext,i);
    }
};

ExprNodeContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterExprNode(this);
	}
};

ExprNodeContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitExprNode(this);
	}
};




SightlyParser.ExprNodeContext = ExprNodeContext;

SightlyParser.prototype.exprNode = function() {

    var localctx = new ExprNodeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, SightlyParser.RULE_exprNode);
    try {
        this.state = 107;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 97;
            localctx.condition = this.orBinaryOp();
            this.state = 98;
            this.match(SightlyParser.TERNARY_Q_OP);
            this.state = 99;
            localctx.thenBranch = this.orBinaryOp();
            this.state = 100;
            this.match(SightlyParser.TERNARY_BRANCHES_OP);
            this.state = 101;
            localctx.elseBranch = this.orBinaryOp();
            localctx.node =  new TernaryOperation(localctx.condition.node, localctx.thenBranch.node, localctx.elseBranch.node)
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 104;
            localctx._orBinaryOp = this.orBinaryOp();
            localctx.node =  localctx._orBinaryOp.node
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


function OrBinaryOpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_orBinaryOp;
    this.node = null
    this.left = null; // AndBinaryOpContext
    this.right = null; // AndBinaryOpContext
    return this;
}

OrBinaryOpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OrBinaryOpContext.prototype.constructor = OrBinaryOpContext;

OrBinaryOpContext.prototype.andBinaryOp = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AndBinaryOpContext);
    } else {
        return this.getTypedRuleContext(AndBinaryOpContext,i);
    }
};

OrBinaryOpContext.prototype.OR_OP = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.OR_OP);
    } else {
        return this.getToken(SightlyParser.OR_OP, i);
    }
};


OrBinaryOpContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterOrBinaryOp(this);
	}
};

OrBinaryOpContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitOrBinaryOp(this);
	}
};




SightlyParser.OrBinaryOpContext = OrBinaryOpContext;

SightlyParser.prototype.orBinaryOp = function() {

    var localctx = new OrBinaryOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, SightlyParser.RULE_orBinaryOp);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 109;
        localctx.left = this.andBinaryOp();
         localctx.node =  localctx.left.node 
        this.state = 117;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SightlyParser.OR_OP) {
            this.state = 111;
            this.match(SightlyParser.OR_OP);
            this.state = 112;
            localctx.right = this.andBinaryOp();
             localctx.node =  new BinaryOperation(BinaryOperator.OR, localctx.node, localctx.right.node) 
            this.state = 119;
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


function AndBinaryOpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_andBinaryOp;
    this.node = null
    this.left = null; // InBinaryOpContext
    this.right = null; // InBinaryOpContext
    return this;
}

AndBinaryOpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AndBinaryOpContext.prototype.constructor = AndBinaryOpContext;

AndBinaryOpContext.prototype.inBinaryOp = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(InBinaryOpContext);
    } else {
        return this.getTypedRuleContext(InBinaryOpContext,i);
    }
};

AndBinaryOpContext.prototype.AND_OP = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.AND_OP);
    } else {
        return this.getToken(SightlyParser.AND_OP, i);
    }
};


AndBinaryOpContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterAndBinaryOp(this);
	}
};

AndBinaryOpContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitAndBinaryOp(this);
	}
};




SightlyParser.AndBinaryOpContext = AndBinaryOpContext;

SightlyParser.prototype.andBinaryOp = function() {

    var localctx = new AndBinaryOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, SightlyParser.RULE_andBinaryOp);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 120;
        localctx.left = this.inBinaryOp();
         localctx.node =  localctx.left.node 
        this.state = 128;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SightlyParser.AND_OP) {
            this.state = 122;
            this.match(SightlyParser.AND_OP);
            this.state = 123;
            localctx.right = this.inBinaryOp();
             localctx.node =  new BinaryOperation(BinaryOperator.AND, localctx.node, localctx.right.node) 
            this.state = 130;
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


function InBinaryOpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_inBinaryOp;
    this.node = null
    this.left = null; // ComparisonTermContext
    this.right = null; // ComparisonTermContext
    return this;
}

InBinaryOpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InBinaryOpContext.prototype.constructor = InBinaryOpContext;

InBinaryOpContext.prototype.comparisonTerm = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ComparisonTermContext);
    } else {
        return this.getTypedRuleContext(ComparisonTermContext,i);
    }
};

InBinaryOpContext.prototype.IN_OP = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.IN_OP);
    } else {
        return this.getToken(SightlyParser.IN_OP, i);
    }
};


InBinaryOpContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterInBinaryOp(this);
	}
};

InBinaryOpContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitInBinaryOp(this);
	}
};




SightlyParser.InBinaryOpContext = InBinaryOpContext;

SightlyParser.prototype.inBinaryOp = function() {

    var localctx = new InBinaryOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, SightlyParser.RULE_inBinaryOp);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 131;
        localctx.left = this.comparisonTerm();
         localctx.node =  localctx.left.node 
        this.state = 139;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SightlyParser.IN_OP) {
            this.state = 133;
            this.match(SightlyParser.IN_OP);
            this.state = 134;
            localctx.right = this.comparisonTerm();
             localctx.node =  new BinaryOperation(BinaryOperator.IN, localctx.node, localctx.right.node) 
            this.state = 141;
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


function ComparisonTermContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_comparisonTerm;
    this.node = null
    this._factor = null; // FactorContext
    this.left = null; // FactorContext
    this._comparisonOp = null; // ComparisonOpContext
    this.right = null; // FactorContext
    return this;
}

ComparisonTermContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ComparisonTermContext.prototype.constructor = ComparisonTermContext;

ComparisonTermContext.prototype.factor = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FactorContext);
    } else {
        return this.getTypedRuleContext(FactorContext,i);
    }
};

ComparisonTermContext.prototype.comparisonOp = function() {
    return this.getTypedRuleContext(ComparisonOpContext,0);
};

ComparisonTermContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterComparisonTerm(this);
	}
};

ComparisonTermContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitComparisonTerm(this);
	}
};




SightlyParser.ComparisonTermContext = ComparisonTermContext;

SightlyParser.prototype.comparisonTerm = function() {

    var localctx = new ComparisonTermContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, SightlyParser.RULE_comparisonTerm);
    try {
        this.state = 150;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 142;
            localctx._factor = this.factor();
             localctx.node =  localctx._factor.node 
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 145;
            localctx.left = this.factor();
            this.state = 146;
            localctx._comparisonOp = this.comparisonOp();
            this.state = 147;
            localctx.right = this.factor();
             localctx.node =  new BinaryOperation(localctx._comparisonOp.op, localctx.left.node, localctx.right.node) 
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


function ComparisonOpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_comparisonOp;
    this.op = null
    return this;
}

ComparisonOpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ComparisonOpContext.prototype.constructor = ComparisonOpContext;

ComparisonOpContext.prototype.GT = function() {
    return this.getToken(SightlyParser.GT, 0);
};

ComparisonOpContext.prototype.LT = function() {
    return this.getToken(SightlyParser.LT, 0);
};

ComparisonOpContext.prototype.LEQ = function() {
    return this.getToken(SightlyParser.LEQ, 0);
};

ComparisonOpContext.prototype.GEQ = function() {
    return this.getToken(SightlyParser.GEQ, 0);
};

ComparisonOpContext.prototype.EQ = function() {
    return this.getToken(SightlyParser.EQ, 0);
};

ComparisonOpContext.prototype.NEQ = function() {
    return this.getToken(SightlyParser.NEQ, 0);
};

ComparisonOpContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterComparisonOp(this);
	}
};

ComparisonOpContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitComparisonOp(this);
	}
};




SightlyParser.ComparisonOpContext = ComparisonOpContext;

SightlyParser.prototype.comparisonOp = function() {

    var localctx = new ComparisonOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, SightlyParser.RULE_comparisonOp);
    try {
        this.state = 164;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SightlyParser.GT:
            this.enterOuterAlt(localctx, 1);
            this.state = 152;
            this.match(SightlyParser.GT);
             localctx.op =  BinaryOperator.GT 
            break;
        case SightlyParser.LT:
            this.enterOuterAlt(localctx, 2);
            this.state = 154;
            this.match(SightlyParser.LT);
             localctx.op =  BinaryOperator.LT 
            break;
        case SightlyParser.LEQ:
            this.enterOuterAlt(localctx, 3);
            this.state = 156;
            this.match(SightlyParser.LEQ);
             localctx.op =  BinaryOperator.LEQ 
            break;
        case SightlyParser.GEQ:
            this.enterOuterAlt(localctx, 4);
            this.state = 158;
            this.match(SightlyParser.GEQ);
             localctx.op =  BinaryOperator.GEQ 
            break;
        case SightlyParser.EQ:
            this.enterOuterAlt(localctx, 5);
            this.state = 160;
            this.match(SightlyParser.EQ);
             localctx.op =  BinaryOperator.STRICT_EQ 
            break;
        case SightlyParser.NEQ:
            this.enterOuterAlt(localctx, 6);
            this.state = 162;
            this.match(SightlyParser.NEQ);
             localctx.op =  BinaryOperator.STRICT_NEQ 
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


function FactorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_factor;
    this.node = null
    this.pa = null; // TermContext
    this.notTerm = null; // TermContext
    return this;
}

FactorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FactorContext.prototype.constructor = FactorContext;

FactorContext.prototype.term = function() {
    return this.getTypedRuleContext(TermContext,0);
};

FactorContext.prototype.NOT_OP = function() {
    return this.getToken(SightlyParser.NOT_OP, 0);
};

FactorContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterFactor(this);
	}
};

FactorContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitFactor(this);
	}
};




SightlyParser.FactorContext = FactorContext;

SightlyParser.prototype.factor = function() {

    var localctx = new FactorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, SightlyParser.RULE_factor);
    try {
        this.state = 173;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SightlyParser.BOOL_CONSTANT:
        case SightlyParser.LBRACKET:
        case SightlyParser.ARRAY_START:
        case SightlyParser.ID:
        case SightlyParser.INT:
        case SightlyParser.FLOAT:
        case SightlyParser.STRING:
            this.enterOuterAlt(localctx, 1);
            this.state = 166;
            localctx.pa = this.term();
             localctx.node =  localctx.pa.node 
            break;
        case SightlyParser.NOT_OP:
            this.enterOuterAlt(localctx, 2);
            this.state = 169;
            this.match(SightlyParser.NOT_OP);
            this.state = 170;
            localctx.notTerm = this.term();
             localctx.node =  new UnaryOperation(UnaryOperator.NOT, localctx.notTerm.node) 
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


function TermContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_term;
    this.node = null
    this._simple = null; // SimpleContext
    this._exprNode = null; // ExprNodeContext
    this._field = null; // FieldContext
    return this;
}

TermContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TermContext.prototype.constructor = TermContext;

TermContext.prototype.simple = function() {
    return this.getTypedRuleContext(SimpleContext,0);
};

TermContext.prototype.ARRAY_START = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.ARRAY_START);
    } else {
        return this.getToken(SightlyParser.ARRAY_START, i);
    }
};


TermContext.prototype.exprNode = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprNodeContext);
    } else {
        return this.getTypedRuleContext(ExprNodeContext,i);
    }
};

TermContext.prototype.ARRAY_END = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.ARRAY_END);
    } else {
        return this.getToken(SightlyParser.ARRAY_END, i);
    }
};


TermContext.prototype.DOT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.DOT);
    } else {
        return this.getToken(SightlyParser.DOT, i);
    }
};


TermContext.prototype.field = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldContext);
    } else {
        return this.getTypedRuleContext(FieldContext,i);
    }
};

TermContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterTerm(this);
	}
};

TermContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitTerm(this);
	}
};




SightlyParser.TermContext = TermContext;

SightlyParser.prototype.term = function() {

    var localctx = new TermContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, SightlyParser.RULE_term);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 175;
        localctx._simple = this.simple();
         localctx.node =  localctx._simple.node 
        this.state = 188;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SightlyParser.DOT || _la===SightlyParser.ARRAY_START) {
            this.state = 186;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case SightlyParser.ARRAY_START:
                this.state = 177;
                this.match(SightlyParser.ARRAY_START);
                this.state = 178;
                localctx._exprNode = this.exprNode();
                this.state = 179;
                this.match(SightlyParser.ARRAY_END);
                 localctx.node =  new PropertyAccess(localctx.node, localctx._exprNode.node) 
                break;
            case SightlyParser.DOT:
                this.state = 182;
                this.match(SightlyParser.DOT);
                this.state = 183;
                localctx._field = this.field();
                 localctx.node =  new PropertyAccess(localctx.node, localctx._field.node) 
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 190;
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


function FieldContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_field;
    this.node = null
    this._ID = null; // Token
    return this;
}

FieldContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldContext.prototype.constructor = FieldContext;

FieldContext.prototype.ID = function() {
    return this.getToken(SightlyParser.ID, 0);
};

FieldContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterField(this);
	}
};

FieldContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitField(this);
	}
};




SightlyParser.FieldContext = FieldContext;

SightlyParser.prototype.field = function() {

    var localctx = new FieldContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, SightlyParser.RULE_field);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 191;
        localctx._ID = this.match(SightlyParser.ID);
         localctx.node =  new StringConstant((localctx._ID===null ? null : localctx._ID.text)) 
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


function SimpleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_simple;
    this.node = null
    this._atom = null; // AtomContext
    this._exprNode = null; // ExprNodeContext
    this._valueList = null; // ValueListContext
    return this;
}

SimpleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SimpleContext.prototype.constructor = SimpleContext;

SimpleContext.prototype.atom = function() {
    return this.getTypedRuleContext(AtomContext,0);
};

SimpleContext.prototype.LBRACKET = function() {
    return this.getToken(SightlyParser.LBRACKET, 0);
};

SimpleContext.prototype.exprNode = function() {
    return this.getTypedRuleContext(ExprNodeContext,0);
};

SimpleContext.prototype.RBRACKET = function() {
    return this.getToken(SightlyParser.RBRACKET, 0);
};

SimpleContext.prototype.ARRAY_START = function() {
    return this.getToken(SightlyParser.ARRAY_START, 0);
};

SimpleContext.prototype.valueList = function() {
    return this.getTypedRuleContext(ValueListContext,0);
};

SimpleContext.prototype.ARRAY_END = function() {
    return this.getToken(SightlyParser.ARRAY_END, 0);
};

SimpleContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterSimple(this);
	}
};

SimpleContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitSimple(this);
	}
};




SightlyParser.SimpleContext = SimpleContext;

SightlyParser.prototype.simple = function() {

    var localctx = new SimpleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, SightlyParser.RULE_simple);
    try {
        this.state = 210;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 194;
            localctx._atom = this.atom();
             localctx.node =  localctx._atom.node 
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 197;
            this.match(SightlyParser.LBRACKET);
            this.state = 198;
            localctx._exprNode = this.exprNode();
            this.state = 199;
            this.match(SightlyParser.RBRACKET);
             localctx.node =  localctx._exprNode.node.withHasParens(true) 
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 202;
            this.match(SightlyParser.ARRAY_START);
            this.state = 203;
            localctx._valueList = this.valueList();
            this.state = 204;
            this.match(SightlyParser.ARRAY_END);
             localctx.node =  new ArrayLiteral(localctx._valueList.values) 
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 207;
            this.match(SightlyParser.ARRAY_START);
            this.state = 208;
            this.match(SightlyParser.ARRAY_END);
             localctx.node =  new ArrayLiteral([]) 
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


function ValueListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_valueList;
    this.values = null
    this.f = null; // ExprNodeContext
    this.p = null; // ExprNodeContext
    return this;
}

ValueListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueListContext.prototype.constructor = ValueListContext;

ValueListContext.prototype.exprNode = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprNodeContext);
    } else {
        return this.getTypedRuleContext(ExprNodeContext,i);
    }
};

ValueListContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SightlyParser.COMMA);
    } else {
        return this.getToken(SightlyParser.COMMA, i);
    }
};


ValueListContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterValueList(this);
	}
};

ValueListContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitValueList(this);
	}
};




SightlyParser.ValueListContext = ValueListContext;

SightlyParser.prototype.valueList = function() {

    var localctx = new ValueListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, SightlyParser.RULE_valueList);
     localctx.values =  [] 
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 212;
        localctx.f = this.exprNode();
         localctx.values.push(localctx.f.node); 
        this.state = 221;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SightlyParser.COMMA) {
            this.state = 215;
            this.match(SightlyParser.COMMA);
            this.state = 216;
            localctx.p = this.exprNode();
             localctx.values.push(localctx.p.node); 
            this.state = 223;
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


function AtomContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_atom;
    this.node = null
    this._stringConst = null; // StringConstContext
    this._ID = null; // Token
    this.numText = null; // Token
    this.boolText = null; // Token
    return this;
}

AtomContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AtomContext.prototype.constructor = AtomContext;

AtomContext.prototype.stringConst = function() {
    return this.getTypedRuleContext(StringConstContext,0);
};

AtomContext.prototype.ID = function() {
    return this.getToken(SightlyParser.ID, 0);
};

AtomContext.prototype.FLOAT = function() {
    return this.getToken(SightlyParser.FLOAT, 0);
};

AtomContext.prototype.INT = function() {
    return this.getToken(SightlyParser.INT, 0);
};

AtomContext.prototype.BOOL_CONSTANT = function() {
    return this.getToken(SightlyParser.BOOL_CONSTANT, 0);
};

AtomContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterAtom(this);
	}
};

AtomContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitAtom(this);
	}
};




SightlyParser.AtomContext = AtomContext;

SightlyParser.prototype.atom = function() {

    var localctx = new AtomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, SightlyParser.RULE_atom);
    var _la = 0; // Token type
    try {
        this.state = 233;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SightlyParser.STRING:
            this.enterOuterAlt(localctx, 1);
            this.state = 224;
            localctx._stringConst = this.stringConst();
             localctx.node =  localctx._stringConst.node 
            break;
        case SightlyParser.ID:
            this.enterOuterAlt(localctx, 2);
            this.state = 227;
            localctx._ID = this.match(SightlyParser.ID);
             localctx.node =  new PropertyIdentifier((localctx._ID===null ? null : localctx._ID.text)) 
            break;
        case SightlyParser.INT:
        case SightlyParser.FLOAT:
            this.enterOuterAlt(localctx, 3);
            this.state = 229;
            localctx.numText = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===SightlyParser.INT || _la===SightlyParser.FLOAT)) {
                localctx.numText = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
             localctx.node =  new NumericConstant((localctx.numText===null ? null : localctx.numText.text)) 
            break;
        case SightlyParser.BOOL_CONSTANT:
            this.enterOuterAlt(localctx, 4);
            this.state = 231;
            localctx.boolText = this.match(SightlyParser.BOOL_CONSTANT);
             localctx.node =  new BooleanConstant((localctx.boolText===null ? null : localctx.boolText.text)) 
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


function StringConstContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SightlyParser.RULE_stringConst;
    this.node = null
    this._STRING = null; // Token
    return this;
}

StringConstContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringConstContext.prototype.constructor = StringConstContext;

StringConstContext.prototype.STRING = function() {
    return this.getToken(SightlyParser.STRING, 0);
};

StringConstContext.prototype.enterRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.enterStringConst(this);
	}
};

StringConstContext.prototype.exitRule = function(listener) {
    if(listener instanceof SightlyParserListener ) {
        listener.exitStringConst(this);
	}
};




SightlyParser.StringConstContext = StringConstContext;

SightlyParser.prototype.stringConst = function() {

    var localctx = new StringConstContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, SightlyParser.RULE_stringConst);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 235;
        localctx._STRING = this.match(SightlyParser.STRING);
         localctx.node =  StringConstant.parse((localctx._STRING===null ? null : localctx._STRING.text)) 
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


exports.SightlyParser = SightlyParser;
