// contentful-utils.ts
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// For HTML to Rich Text conversion, we'll need to implement our own or use a different approach
export const htmlToContentfulRichText = (html: string): Document => {
    // This is a simplified version - you might want to implement a more robust parser
    // or use a library like html-to-contentful-rich-text if needed

    // Basic implementation for paragraphs and lists
    if (html.startsWith('<ul>') || html.startsWith('<ol>')) {
        return {
            nodeType: BLOCKS.DOCUMENT,
            data: {},
            content: [{
                nodeType: html.startsWith('<ul>') ? BLOCKS.UL_LIST : BLOCKS.OL_LIST,
                data: {},
                content: html
                    .replace(/<[^>]*>/g, '\n')
                    .split('\n')
                    .filter(line => line.trim())
                    .map(item => ({
                        nodeType: BLOCKS.LIST_ITEM,
                        data: {},
                        content: [{
                            nodeType: BLOCKS.PARAGRAPH,
                            data: {},
                            content: [{
                                nodeType: 'text',
                                value: item.trim(),
                                marks: [],
                                data: {},
                            }],
                        }],
                    })),
            }],
        };
    }

    // Default to paragraph
    return {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [{
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [{
                nodeType: 'text',
                value: html.replace(/<[^>]*>/g, ''),
                marks: [],
                data: {},
            }],
        }],
    };
};

export const contentfulRichTextToHtml = (document: Document): string => {
    return documentToHtmlString(document);
};