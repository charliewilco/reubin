import { load } from "cheerio";

export class MetaKit {
	constructor(html: string) {
		load(html);
	}
}
