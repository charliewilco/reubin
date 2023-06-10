export interface PurifyMiddleware {
	allowedTags: Set<string>;
	allowedAttributes: Set<string>;
	onTag?: (tag: string, attrs: { [key: string]: string }) => string | void;
	onAttribute?: (attr: string, value: string) => string;
	onText?: (text: string) => string;
}

export class ImageSanitizerPlugin implements PurifyMiddleware {
	allowedTags = new Set(["img"]);
	allowedAttributes = new Set(["src", "alt"]);

	onTag(tag: string, attrs: { [key: string]: string }): string {
		if (attrs.src && attrs.src.match(/^https?:\/\/.*\.(jpg|jpeg|gif|png)$/i)) {
			return tag;
		} else {
			return "";
		}
	}
}

export class HrefSanitizerPlugin implements PurifyMiddleware {
	private naughtyHosts = new Set(["evil.com", "malware.org"]);

	allowedTags = new Set(["a"]);
	allowedAttributes = new Set(["href"]);

	onTag(tag: string, attrs: { [key: string]: string }): string {
		const href = attrs.href;
		if (!href) {
			// No href attribute, skip the tag
			return "";
		}

		try {
			const { protocol, hostname } = new URL(href);
			if (protocol !== "http:" && protocol !== "https:") {
				// Invalid protocol, skip the tag
				return "";
			}

			if (this.naughtyHosts.has(hostname)) {
				// Naughty host, strip the href attribute
				delete attrs.href;
			}

			return tag;
		} catch (err) {
			// Invalid URL, skip the tag
			return tag;
		}
	}
}

export class RelativeHrefSanitizerPlugin implements PurifyMiddleware {
	allowedTags = new Set(["a"]);
	allowedAttributes = new Set(["href"]);
	baseURI: string;

	constructor(baseURI: string) {
		this.baseURI = baseURI;
	}

	onAttribute(attr: string, value: string): string {
		// If this is not the `href` attribute, do nothing with it.
		if (attr !== "href") return value;

		if (!value) {
			// No href attribute, skip the tag
			return "";
		}

		try {
			// If this is a standard URL, do nothing with it.
			new URL(value);

			return value;
		} catch (err) {
			// If this is a relative URL, add the base URL to it.
			return new URL(value, this.baseURI).href;
		}
	}
}

// HTML tags allow list
// HTML attributes allow list

export class ScriptAndStyleTagRemoverPlugin implements PurifyMiddleware {
	allowedTags: Set<string> = new Set([
		"*",
		"!doctype",
		"html",
		"head",
		"title",
		"body",
		"p",
		"a",
		"strong",
		"em",
		"u",
		"s",
		"ol",
		"ul",
		"li",
	]);
	allowedAttributes: Set<string> = new Set(["style", "href", "alt", "src", "class", "id"]);

	onTag(tag: string, attrs: { [key: string]: string }): string {
		if (tag === "script" || tag === "style") {
			return ""; // remove the tag
		} else if (!this.allowedTags.has(tag)) {
			return ""; // remove the tag
		}

		return tag;
	}
}

export class XSSSanitizerPlugin implements PurifyMiddleware {
	allowedTags = new Set([
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
		"p",
	]);
	allowedAttributes = new Set(["href", "title"]);

	onTag(tag: string, attrs: { [key: string]: string }): string {
		if (attrs.href) {
			attrs.href = this.stripXSS(attrs.href);
		}

		if (attrs.title) {
			attrs.title = this.stripXSS(attrs.title);
		}

		return tag;
	}

	onText(text: string): string {
		return this.stripXSS(text);
	}

	private stripXSS(value: string): string {
		// Strip any <script> tags
		value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

		// Replace any XSS attack strings with spaces
		value = value.replace(/&(#[0-9]+|[a-z]+);?/gi, (match, capture) => {
			const entity = match.toLowerCase();
			if (entity.startsWith("on")) {
				return " ";
			} else {
				return match;
			}
		});

		return value;
	}
}

export class YoutubeIframeSanitizerPlugin implements PurifyMiddleware {
	allowedTags: Set<string> = new Set(["iframe"]);
	allowedAttributes: Set<string> = new Set([
		"allowfullscreen",
		"frameborder",
		"height",
		"src",
		"width",
	]);

	onTag(tag: string, attrs: { [key: string]: string }): string | void {
		if (tag === "iframe") {
			const src = attrs["src"];
			if (src && src.startsWith("https://www.youtube.com/embed/")) {
				// Only allow necessary attributes for YouTube embeds
				const allowedAttrs: { [key: string]: string } = {};
				for (const attr in attrs) {
					if (this.allowedAttributes.has(attr)) {
						allowedAttrs[attr] = attrs[attr];
					}
				}

				return `<${tag} ${Object.entries(allowedAttrs)
					.map(([name, value]) => `${name}="${value}"`)
					.join(" ")}>`;
			}
		}
	}
}

export const DEFAULT_MIDDLEWARE: PurifyMiddleware[] = [
	new ImageSanitizerPlugin(),
	new HrefSanitizerPlugin(),
	new XSSSanitizerPlugin(),
	new ScriptAndStyleTagRemoverPlugin(),
	new YoutubeIframeSanitizerPlugin(),
];
