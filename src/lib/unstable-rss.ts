import { create } from "xmlbuilder2";
import { XMLSerializedAsObject, XMLSerializedAsObjectArray } from "xmlbuilder2/lib/interfaces";
import _ from "lodash";

export interface Enclosure {
	url: string;
	length?: number;
	type?: string;
}

export interface RSSItem {
	link?: string;
	guid?: string;
	title?: string;
	pubDate?: string;
	creator?: string;
	summary?: string;
	content?: string;
	isoDate?: string;
	categories?: string[];
	contentSnippet?: string;
	enclosure?: Enclosure;
}
type FeedTypes = "rss" | "atom" | "json";

interface RSSFeed {
	title?: string;
	description?: string;
	link?: string;
	feedUrl?: string;
	author?: string;
	language?: string;
	items?: RSSItem[];
}

export class unstable_RSSKit {
	constructor() {}

	getFeedType(document: XMLSerializedAsObject) {
		// @ts-expect-error
		if (document.rss && document.rss["@_version"] === "2.0") {
			return "RSS 2.0";
		}

		// Check for RSS 1.0
		// @ts-expect-error
		if (document["rdf:RDF"] && document["rdf:RDF"]["channel"]) {
			return "RSS 1.0";
		}

		// Check for Atom
		// @ts-expect-error
		if (document.feed && document.feed.title) {
			return "Atom";
		}
	}

	containsEnclousure(_item: RSSItem) {}

	async parse(data: string) {
		return new Promise<RSSFeed>((resolve, reject) => {
			try {
				const document = create({ skipWhitespaceOnlyText: false }, data).end({
					format: "object",
				});
				const channel = _.get(document, "rss.channel");
				const items = _.get(channel, "item") ?? [];

				items.map((item) => {
					return {
						title: _.get(item, "title"),
						link: _.get(item, "link"),
						pubDate: _.get(item, "pubDate"),
						description: _.get(item, "description"),
					};
				});

				resolve({
					title: _.get(channel, "title"),
					description: _.get(channel, "description"),
					link: _.get(channel, "link"),
					feedUrl: _.get(channel, "atom:link.@_href"),
					items,
				});
			} catch (error) {
				console.error(`Error parsing data: ${error}`);
				reject(`Error parsing data: ${error}`);
			}
		});
	}
}
