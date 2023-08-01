import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { redis } from "./kv";

interface ExpandedArticle<T> {
	/** article title */
	title: string;

	/** HTML string of processed article content */
	content: T;

	/** text content of the article, with all the HTML tags removed */
	textContent: string;

	/** length of an article, in characters */
	length: number;

	/** article description, or short excerpt from the content */
	excerpt: string;

	/** author metadata */
	byline: string;

	/** content direction */
	dir: string;

	/** name of the site */
	siteName: string;

	/** content language */
	lang: string;
}

type ExpandedResponse = ExpandedArticle<string> | null;

export class ArticleExpander {
	static async fetchArticle(link: string): Promise<ExpandedResponse> {
		let response = await fetch(link);
		let text = await response.text();

		let document = new JSDOM(text);
		let reader = new Readability(document.window.document);

		/*
		 * there's no need to purify the HTML because Readability is already handling this
		 */
		return reader.parse();
	}

	static async getArticle(id: string, link: string): Promise<ExpandedArticle<string>> {
		let key = `entry:${id}`;
		let result = await redis.get<ExpandedArticle<string>>(key);

		if (result) {
			return result;
		}

		let parsed = await ArticleExpander.fetchArticle(link);

		if (parsed === null) {
			throw new Error("Failed to parse article");
		}

		await redis.set(key, parsed, { ex: 60 * 60 * 24 });

		return parsed;
	}
}
