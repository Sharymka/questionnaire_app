import {marked} from 'marked';


export function convertMarkdownToHTML(markdownText) {
	return marked(markdownText);
}
