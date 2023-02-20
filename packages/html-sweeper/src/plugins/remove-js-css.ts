import type { SanitizerPlugin } from "./plugin";

// HTML tags allow list
// HTML attributes allow list

export class ScriptAndStyleTagRemoverPlugin implements SanitizerPlugin {
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
	allowedAttributes: Set<string> = new Set(["*"]);

	// @ts-expect-error
	onTag(tag: string, attrs: { [key: string]: string }): string {
		if (tag === "script" || tag === "style") {
			return ""; // remove the tag
		} else if (!this.allowedTags.has(tag)) {
			return ""; // remove the tag
		}
	}
}
