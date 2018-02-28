/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const HTMLParserListener = require('../generated/HTMLParserListener').HTMLParserListener;

module.exports = class MarkupListener extends HTMLParserListener {

    /**
     * @param {MarkupHandler} handler The markup handler
     */
    constructor(handler) {
        super();
        this._handler = handler;
    }

    enterHtmlDocument(ctx) {
        this._handler.onDocumentStart();
    }

    exitHtmlDocument(ctx) {
        this._handler.onDocumentEnd();
    }


    enterHtmlElements(ctx) {
    }

    exitHtmlElements(ctx) {
    }


    enterHtmlElement(ctx) {
        const tagNames = ctx.htmlTagName();
        if (tagNames.length > 0) {
            const tagName = tagNames[0].getText();
            this._handler.onOpenTagStart(tagName);

            const attributes = ctx.htmlAttribute();
            attributes.forEach((attrCtx) => {
                const name = attrCtx.htmlAttributeName(0).getText();
                const values = attrCtx.htmlAttributeValue();
                if (values === null) {
                    this._handler.onAttribute(name, null, null);
                } else {
                    let value = values.getText().trim();
                    let quoteChar = value[0];
                    if (quoteChar === '"' || quoteChar === '\'') {
                        value = value.substring(1, value.length - 1);
                    } else {
                        quoteChar = '';
                    }
                    this._handler.onAttribute(name, value, quoteChar);
                }
            });
            this._handler.onOpenTagEnd(tagNames.length === 1);
        }
    }

    exitHtmlElement(ctx) {
        const tagNames = ctx.htmlTagName();
        if (tagNames.length > 1) {
            this._handler.onCloseTag(tagNames[0].getText());
        }
    }

    enterHtmlContent(ctx) {

    }

    exitHtmlContent(ctx) {
    }


    enterHtmlAttribute(ctx) {
    }

    exitHtmlAttribute(ctx) {
    }


    enterHtmlAttributeName(ctx) {
    }

    exitHtmlAttributeName(ctx) {
    }


    enterHtmlAttributeValue(ctx) {
    }

    exitHtmlAttributeValue(ctx) {
    }


    enterHtmlTagName(ctx) {
    }

    exitHtmlTagName(ctx) {
    }


    enterHtmlChardata(ctx) {
        this._handler.onText(ctx.getText());
    }

    exitHtmlChardata(ctx) {
    }


    enterHtmlMisc(ctx) {
    }

    exitHtmlMisc(ctx) {
    }


    enterHtmlComment(ctx) {
        /* eslint new-cap: 'off' */
        this._handler.onComment(ctx.HTML_COMMENT().getText());
    }

    exitHtmlComment(ctx) {
    }


    enterXhtmlCDATA(ctx) {
    }

    exitXhtmlCDATA(ctx) {
    }


    enterDtd(ctx) {
        this._handler.onDocType(ctx.getText());
    }

    exitDtd(ctx) {
    }


    enterXml(ctx) {
    }

    exitXml(ctx) {
    }


    enterScriptlet(ctx) {
    }

    exitScriptlet(ctx) {
    }


    enterScript(ctx) {
        this._handler.onOpenTagStart('script');

        const attributes = ctx.htmlScriptAttribute();
        attributes.forEach((attrCtx) => {
            const name = attrCtx.htmlScriptAttributeName(0).getText();
            const values = attrCtx.htmlAttributeValue();
            if (values === null) {
                this._handler.onAttribute(name, null, null);
            } else {
                let value = values.getText().trim();
                let quoteChar = value[0];
                if (quoteChar === '"' || quoteChar === '\'') {
                    value = value.substring(1, value.length - 1);
                } else {
                    quoteChar = '';
                }
                this._handler.onAttribute(name, value, quoteChar);
            }
        });

        /* eslint new-cap: 'off' */
        const empty = ctx.SCRIPT_TAG_SLASH_CLOSE() !== null;
        this._handler.onOpenTagEnd(empty);

        const body = ctx.SCRIPT_BODY();
        if (body) {
            const script = body.getText();
            this._handler.onText(script.substring(0, script.length - 9));
        }
        if (!empty) {
            this._handler.onCloseTag('script');
        }
    }

    exitScript(ctx) {
    }

    enterStyle(ctx) {
        this._handler.onOpenTagStart('style');

        const attributes = ctx.htmlStyleAttribute();
        attributes.forEach((attrCtx) => {
            const name = attrCtx.htmlStyleAttributeName(0).getText();
            const values = attrCtx.htmlAttributeValue();
            if (values === null) {
                this._handler.onAttribute(name, null, null);
            } else {
                let value = values.getText().trim();
                let quoteChar = value[0];
                if (quoteChar === '"' || quoteChar === '\'') {
                    value = value.substring(1, value.length - 1);
                } else {
                    quoteChar = '';
                }
                this._handler.onAttribute(name, value, quoteChar);
            }
        });

        this._handler.onOpenTagEnd(false);
        const body = ctx.STYLE_BODY();
        if (body) {
            const script = body.getText();
            this._handler.onText(script.substring(0, script.length - 8));
        }
        this._handler.onCloseTag('style');
    }

    exitStyle(ctx) {
    }

};
