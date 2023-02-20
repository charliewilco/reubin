import type { ParserOptions } from "htmlparser2";
import type { StackFrame } from "./frame";

export type AllowedAttribute =
	| string
	| { name: string; multiple?: boolean | undefined; values: string[] };
export type DisallowedTagsModes = "discard" | "escape" | "recursiveEscape";

export interface IOptions {
	allowedAttributes?: Record<string, AllowedAttribute[]> | false | undefined;
	allowedStyles?: { [index: string]: { [index: string]: RegExp[] } } | undefined;
	allowedClasses?: { [index: string]: boolean | Array<string | RegExp> } | undefined;
	allowedIframeDomains?: string[] | undefined;
	allowedIframeHostnames?: string[] | undefined;
	allowIframeRelativeUrls?: boolean | undefined;
	allowedSchemes?: string[] | boolean | undefined;
	allowedSchemesByTag?: { [index: string]: string[] } | boolean | undefined;
	allowedSchemesAppliedToAttributes?: string[] | undefined;
	allowedScriptDomains?: string[] | undefined;
	allowedScriptHostnames?: string[] | undefined;
	allowProtocolRelative?: boolean | undefined;
	allowedTags?: string[] | false | undefined;
	allowVulnerableTags?: boolean | undefined;
	textFilter?: ((text: string, tagName: string) => string) | undefined;
	exclusiveFilter?: ((frame: StackFrame) => boolean) | undefined;
	nestingLimit?: number | undefined;
	nonTextTags?: string[] | undefined;
	selfClosing?: string[] | undefined;
	transformTags?: { [tagName: string]: string | Transformer } | undefined;
	parser?: ParserOptions | undefined;
	disallowedTagsMode?: DisallowedTagsModes | undefined;
	/**
	 * Setting this option to true will instruct sanitize-html to discard all characters outside of html tag boundaries
	 * -- before `<html>` and after `</html>` tags
	 * @see {@link https://github.com/apostrophecms/sanitize-html/#discarding-text-outside-of-htmlhtml-tags}
	 * @default true
	 */
	enforceHtmlBoundary?: boolean | undefined;
}

export type EnforcedOptions = Required<
	Pick<
		IOptions,
		| "allowedTags"
		| "disallowedTagsMode"
		| "allowedAttributes"
		| "selfClosing"
		| "allowedSchemes"
		| "allowedSchemesByTag"
		| "allowedSchemesAppliedToAttributes"
		| "allowProtocolRelative"
		| "enforceHtmlBoundary"
	>
>;

export const defaultOptions: EnforcedOptions = {
	allowedTags: [
		// Sections derived from MDN element categories and limited to the more
		// benign categories.
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
		// Content sectioning
		"address",
		"article",
		"aside",
		"footer",
		"header",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"hgroup",
		"main",
		"nav",
		"section",
		// Text content
		"blockquote",
		"dd",
		"div",
		"dl",
		"dt",
		"figcaption",
		"figure",
		"hr",
		"li",
		"main",
		"ol",
		"p",
		"pre",
		"ul",
		// Inline text semantics
		"a",
		"abbr",
		"b",
		"bdi",
		"bdo",
		"br",
		"cite",
		"code",
		"data",
		"dfn",
		"em",
		"i",
		"kbd",
		"mark",
		"q",
		"rb",
		"rp",
		"rt",
		"rtc",
		"ruby",
		"s",
		"samp",
		"small",
		"span",
		"strong",
		"sub",
		"sup",
		"time",
		"u",
		"var",
		"wbr",
		// Table content
		"caption",
		"col",
		"colgroup",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"tr",
	],
	disallowedTagsMode: "discard",
	allowedAttributes: {
		a: ["href", "name", "target"],
		// We don't currently allow img itself by default, but
		// these attributes would make sense if we did.
		img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
	},
	// Lots of these won't come up by default because we don't allow them
	selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
	// URL schemes we permit
	allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
	allowedSchemesByTag: {},
	allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
	allowProtocolRelative: true,
	enforceHtmlBoundary: false,
};
