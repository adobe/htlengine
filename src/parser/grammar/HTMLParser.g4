/*
 [The "BSD licence"]
 Copyright (c) 2013 Tom Everett
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
    derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

parser grammar HTMLParser;

options { tokenVocab=HTMLLexer; }

htmlDocument
    : (htmlComment | htmlChardata)* dtd? (htmlComment | htmlChardata)* htmlElements*
    ;

htmlElements
    : htmlContent* htmlElement htmlContent*
    ;

htmlElement
    : script
    | style
    | TAG_OPEN htmlTagName htmlAttribute* TAG_CLOSE
    | TAG_OPEN TAG_SLASH htmlTagName SEA_WS? TAG_CLOSE
    | TAG_OPEN htmlTagName htmlAttribute* TAG_SLASH_CLOSE
    ;

htmlContent
    : htmlChardata
    | xhtmlCDATA
    | htmlComment
    ;

htmlAttribute
    : htmlAttributeName TAG_EQUALS htmlAttributeValue
    | htmlAttributeName
    ;

htmlScriptAttribute
    : htmlScriptAttributeName SCRIPT_TAG_EQUALS htmlAttributeValue
    | htmlScriptAttributeName
    ;

htmlStyleAttribute
    : htmlStyleAttributeName STYLE_TAG_EQUALS htmlAttributeValue
    | htmlStyleAttributeName
    ;

htmlAttributeName
    : TAG_NAME
    ;

htmlScriptAttributeName
    : SCRIPT_TAG_NAME
    ;

htmlStyleAttributeName
    : STYLE_TAG_NAME
    ;

htmlAttributeValue
    : ATTVALUE_VALUE
    ;

htmlTagName
    : TAG_NAME
    ;

htmlChardata
    : HTML_TEXT
    | SEA_WS
    ;

htmlMisc
    : htmlComment
    | SEA_WS
    ;

htmlComment
    : HTML_COMMENT
    | HTML_CONDITIONAL_COMMENT
    ;

xhtmlCDATA
    : CDATA
    ;

dtd
    : DTD
    ;

xml
    : XML_DECLARATION
    ;

script
    : SCRIPT_OPEN htmlScriptAttribute+ SCRIPT_TAG_CLOSE SCRIPT_BODY
    | SCRIPT_OPEN htmlScriptAttribute+ SCRIPT_TAG_SLASH_CLOSE
    | SCRIPT_NOATTRS SCRIPT_BODY
    ;

style
    : STYLE_OPEN htmlStyleAttribute+ STYLE_TAG_CLOSE STYLE_BODY
    | STYLE_OPEN htmlStyleAttribute+ STYLE_TAG_SLASH_CLOSE
    | STYLE_NOATTRS STYLE_BODY
    ;
