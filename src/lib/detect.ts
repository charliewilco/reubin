import axios from "axios";
import { load, CheerioAPI } from "cheerio";

export interface DetectedRSSLink {
	href: string;
	type: string;
	title: string;
}

interface DetectionMessage {
	url: string;
}

let FEED_TYPES = [
	"application/rss+xml",
	"application/atom+xml",
	"application/rdf+xml",
	"application/rss",
	"application/atom",
	"application/rdf",
	"text/rss+xml",
	"text/atom+xml",
	"text/rdf+xml",
	"text/rss",
	"text/atom",
	"text/rdf",
];

export class FeedDetection {
	public document: CheerioAPI | null = null;
	constructor(private message: DetectionMessage, _html?: string) {
		if (_html) {
			this.document = load(_html);
		}
	}

	async detect() {
		let feeds: DetectedRSSLink[] = [];

		return new Promise<DetectedRSSLink[]>(async (resolve, reject) => {
			if (this.document === null) {
				try {
					let response = await axios.get(this.message.url);

					this.document = load(response.data);
				} catch (error) {
					reject(error);
				}
			}

			this.document!("link[type]").each((_index, link) => {
				if (link.attribs["type"] && FEED_TYPES.indexOf(link.attribs["type"]!) !== -1) {
					let feed_url = link.attribs["href"];
					let feed_type = link.attribs["type"];
					let feed_title = link.attribs["title"];

					if (feed_url) {
						// If feed's url starts with "//"
						if (feed_url.indexOf("//") === 0) feed_url = "http:" + feed_url;
						// If feed's url starts with "/"
						else if (feed_url.startsWith("/"))
							feed_url =
								this.message.url.split("/")[0] +
								"//" +
								this.message.url.split("/")[2] +
								feed_url;
						else if (!/^(http|https):\/\//i.test(feed_url))
							feed_url = this.message.url + "/" + feed_url.replace(/^\//g, "");

						let feed = {
							type: feed_type ?? "application/rss+xml",
							href: feed_url,
							title: feed_title || feed_url,
						};
						feeds.push(feed);
					}
				}
			});

			resolve(feeds);
		});
	}
}
