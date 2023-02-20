import { Parser, DomHandler, } from "htmlparser2";
import type { ChildNode } from "domhandler"

export class HTMLSanitizer {
	private allowedTags: Set<string> = new Set([
		"a",
		"abbr",
		"acronym",
		"b",
		"blockquote",
		"code",
		"em",
		"i",
		"li",
		"ol",
		"strong",
		"ul",
	]);
	private allowedAttributes: Set<string> = new Set(["href", "title"]);

	public sanitize(html: string): string {
		let sanitizedHtml = "";

		// Create a new parser
		const parser = new Parser(
			new DomHandler((err, dom) => {
				if (err) {
					throw err;
				}

				sanitizedHtml = this.traverse(dom);
			})
		);

		// Parse the HTML
		parser.write(html);
		parser.end();

		return sanitizedHtml;
	}

	private traverse(nodes: ChildNode[]): string {
		let result = "";

		nodes.forEach((node) => {
			if (node.type === "tag" && this.allowedTags.has(node.name)) {
				result += `<${node.name}`;

				if (node.attribs) {
					Object.keys(node.attribs).forEach((attr) => {
						if (this.allowedAttributes.has(attr)) {
							result += ` ${attr}="${node.attribs[attr]}"`;
						}
					});
				}

				result += ">";

				if (node.children) {
					result += this.traverse(node.children);
				}

				result += `</${node.name}>`;
			} else if (node.type === "text") {
				result += node.data;
			}
		});

		return result;
	}
}
