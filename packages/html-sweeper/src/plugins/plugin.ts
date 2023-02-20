export interface SanitizerPlugin {
	allowedTags: Set<string>;
	allowedAttributes: Set<string>;
	onTag?: (tag: string, attrs: { [key: string]: string }) => string | void;
	onText?: (text: string) => string;
}
