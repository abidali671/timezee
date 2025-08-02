import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { DOMParser } from '@xmldom/xmldom';

const MARK_TAGS: Record<string, string> = {
    strong: MARKS.BOLD,
    b: MARKS.BOLD,
    em: MARKS.ITALIC,
    i: MARKS.ITALIC,
    u: MARKS.UNDERLINE,
    s: MARKS.STRIKETHROUGH,
    strike: MARKS.STRIKETHROUGH,
    code: MARKS.CODE,
};

const createBlockNode = (nodeType: BLOCKS, content: any[]) => ({
    nodeType,
    data: {},
    content: content.length ? content : [createTextNode(' ')],
});

const createInlineNode = (nodeType: INLINES, content: any[], data: any) => ({
    nodeType,
    data,
    content,
});

const createTextNode = (value: string, marks: { type: string }[] = []) => ({
    nodeType: 'text',
    value,
    marks,
    data: {},
});

export const htmlToContentfulRichText = (html: string): Document => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const body = doc.documentElement || doc; // fallback for xmldom

    // Recursive function to process nodes safely with xmldom
    const processNode = (
        node: any,
        currentMarks: { type: string }[] = []
    ): any => {
        if (!node) return null;

        // TEXT_NODE = 3
        if (node.nodeType === 3) {
            // In xmldom text content is in `data` or `nodeValue`
            const text = node.data || node.nodeValue || '';
            if (!text.trim()) return null;

            return {
                nodeType: 'text',
                value: text,
                marks: [...currentMarks],
                data: {},
            };
        }

        // Only process ELEMENT_NODE = 1
        if (node.nodeType !== 1) return null;

        const element = node;
        // tagName might be undefined, so fallback to empty string
        const tagName = (element.tagName || '').toLowerCase();

        // Process children recursively
        const children = Array.from(element.childNodes || [])
            .map((child: any) => processNode(child, [...currentMarks]))
            .filter(Boolean)
            .flat();

        // Handle marks
        const markType = MARK_TAGS[tagName];
        if (markType) {
            return children.map((child: any) => ({
                ...child,
                marks: [...(child.marks || []), { type: markType }],
            }));
        }

        // Handle block elements
        switch (tagName) {
            case 'h1':
                return createBlockNode(BLOCKS.HEADING_1, children);
            case 'h2':
                return createBlockNode(BLOCKS.HEADING_2, children);
            case 'h3':
                return createBlockNode(BLOCKS.HEADING_3, children);
            case 'h4':
                return createBlockNode(BLOCKS.HEADING_4, children);
            case 'h5':
                return createBlockNode(BLOCKS.HEADING_5, children);
            case 'h6':
                return createBlockNode(BLOCKS.HEADING_6, children);
            case 'p':
                return createBlockNode(BLOCKS.PARAGRAPH, children);
            case 'ul':
                return createBlockNode(BLOCKS.UL_LIST, children);
            case 'ol':
                return createBlockNode(BLOCKS.OL_LIST, children);
            case 'li': {
                // Wrap li content in paragraph if not already paragraph
                const hasParagraphChild = children.some(
                    (c: any) => c.nodeType === BLOCKS.PARAGRAPH
                );
                const liContent = hasParagraphChild
                    ? children
                    : [createBlockNode(BLOCKS.PARAGRAPH, children)];
                return createBlockNode(BLOCKS.LIST_ITEM, liContent);
            }
            case 'a':
                return createInlineNode(INLINES.HYPERLINK, children, {
                    uri: element.getAttribute('href') || '',
                });
            case 'br':
                return createTextNode('\n', currentMarks);
            default:
                return children.length ? children : null;
        }
    };

    // Process all child nodes of the root <div> wrapper
    const content = Array.from(body.childNodes || [])
        .map((node: any) => processNode(node))
        .filter(Boolean)
        .flat();

    return {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: content.length
            ? content
            : [createBlockNode(BLOCKS.PARAGRAPH, [])], // fallback empty paragraph
    };
};

export const contentfulRichTextToHtml = (document: Document): string => {
    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: string) => `<strong>${text}</strong>`,
            [MARKS.ITALIC]: (text: string) => `<em>${text}</em>`,
            [MARKS.UNDERLINE]: (text: string) => `<u>${text}</u>`,
            [MARKS.STRIKETHROUGH]: (text: string) => `<s>${text}</s>`,
            [MARKS.CODE]: (text: string) => `<code>${text}</code>`,
        },
        renderNode: {
            [BLOCKS.HEADING_1]: (_: any, content: string) => `<h1>${content}</h1>`,
            [BLOCKS.HEADING_2]: (_: any, content: string) => `<h2>${content}</h2>`,
            [BLOCKS.HEADING_3]: (_: any, content: string) => `<h3>${content}</h3>`,
            [BLOCKS.HEADING_4]: (_: any, content: string) => `<h4>${content}</h4>`,
            [BLOCKS.HEADING_5]: (_: any, content: string) => `<h5>${content}</h5>`,
            [BLOCKS.HEADING_6]: (_: any, content: string) => `<h6>${content}</h6>`,
            [BLOCKS.PARAGRAPH]: (_: any, content: string) => `<p>${content}</p>`,
            [BLOCKS.UL_LIST]: (_: any, content: string) => `<ul>${content}</ul>`,
            [BLOCKS.OL_LIST]: (_: any, content: string) => `<ol>${content}</ol>`,
            [BLOCKS.LIST_ITEM]: (_: any, content: string) => `<li>${content}</li>`,
            [INLINES.HYPERLINK]: (node: any, content: string) =>
                `<a href="${node.data.uri}">${content}</a>`,
        },
    };

    // @ts-expect-error - Contentful types don't perfectly match the actual implementation
    return documentToHtmlString(document, options);
};
