// contentful-utils.ts
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export const htmlToContentfulRichText = (html: string): Document => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const body = doc.body.firstChild as HTMLElement;

    const processNode = (node: Node, currentMarks: { type: string }[] = []): any => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            return text ? {
                nodeType: 'text',
                value: text,
                marks: [...currentMarks],
                data: {}
            } : null;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return null;

        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const children = Array.from(element.childNodes)
            .map(child => processNode(child, [...currentMarks]))
            .filter(Boolean)
            .flat();

        // Handle text formatting marks
        const newMarks = [...currentMarks];
        switch (tagName) {
            case 'strong':
            case 'b':
                newMarks.push({ type: 'bold' });
                break;
            case 'em':
            case 'i':
                newMarks.push({ type: 'italic' });
                break;
            case 'u':
                newMarks.push({ type: 'underline' });
                break;
            case 's':
            case 'strike':
                newMarks.push({ type: 'strikethrough' });
                break;
            case 'code':
                newMarks.push({ type: 'code' });
                break;
        }

        // For mark elements, just process children with new marks
        if (['strong', 'b', 'em', 'i', 'u', 's', 'strike', 'code'].includes(tagName)) {
            return children;
        }

        // Handle block elements
        switch (tagName) {
            case 'h1': return createBlockNode(BLOCKS.HEADING_1, children);
            case 'h2': return createBlockNode(BLOCKS.HEADING_2, children);
            case 'h3': return createBlockNode(BLOCKS.HEADING_3, children);
            case 'h4': return createBlockNode(BLOCKS.HEADING_4, children);
            case 'h5': return createBlockNode(BLOCKS.HEADING_5, children);
            case 'h6': return createBlockNode(BLOCKS.HEADING_6, children);
            case 'p': return createBlockNode(BLOCKS.PARAGRAPH, children);
            case 'ul': return createBlockNode(BLOCKS.UL_LIST, children);
            case 'ol': return createBlockNode(BLOCKS.OL_LIST, children);
            case 'li':
                const liContent = children.some(c => c.nodeType === BLOCKS.PARAGRAPH)
                    ? children
                    : [createBlockNode(BLOCKS.PARAGRAPH, children)];
                return createBlockNode(BLOCKS.LIST_ITEM, liContent);
            case 'a': return createInlineNode(INLINES.HYPERLINK, children, {
                uri: element.getAttribute('href') || ''
            });
            case 'br': return createTextNode('\n', currentMarks);
            default: return children.length ? children : null;
        }
    };

    const createBlockNode = (nodeType: BLOCKS, content: any[]) => ({
        nodeType,
        data: {},
        content: content.length ? content : [createTextNode(' ')]
    });

    const createInlineNode = (nodeType: INLINES, content: any[], data: any) => ({
        nodeType,
        data,
        content
    });

    const createTextNode = (value: string, marks: { type: string }[] = []) => ({
        nodeType: 'text',
        value,
        marks,
        data: {}
    });

    // Process all nodes
    const content = Array.from(body.childNodes)
        .map(node => processNode(node))
        .filter(Boolean)
        .flat();

    return {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: content.length ? content : [createBlockNode(BLOCKS.PARAGRAPH, [])]
    };
};

export const contentfulRichTextToHtml = (document: Document): string => {
    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: string) => `<strong>${text}</strong>`,
            [MARKS.ITALIC]: (text: string) => `<em>${text}</em>`,
            [MARKS.UNDERLINE]: (text: string) => `<u>${text}</u>`,
            [MARKS.STRIKETHROUGH]: (text: string) => `<s>${text}</s>`,
            [MARKS.CODE]: (text: string) => `<code>${text}</code>`
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
                `<a href="${node.data.uri}">${content}</a>`
        }
    };

    return documentToHtmlString(document, options);
};