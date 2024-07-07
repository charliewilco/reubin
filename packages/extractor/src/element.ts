import type * as cheerio from "cheerio";

export type $Element = cheerio.Cheerio<cheerio.Element | cheerio.Document>;

export function isElement(item: $Element): item is cheerio.Cheerio<cheerio.Element> {
	const node = item[0];
	if (node) {
		return node.type === "tag" || node.type === "root";
	}
	return false;
}

export function getTagName(element: $Element): string {
	return isElement(element) ? element[0].tagName : "";
}
