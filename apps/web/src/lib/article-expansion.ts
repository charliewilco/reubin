import { ContentExtractor } from "@r/extractor";
import type { ExtractorResult } from "@r/extractor";
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

async function fetchArticle(link: string): Promise<ExtractorResult | null> {
	let response = await fetch(link);
	let text = await response.text();

	let reader = new ContentExtractor();

	/*
	 * there's no need to purify the HTML because Readability is already handling this
	 */
	return reader.parse(link);
}

async function getArticle(id: string, link: string): Promise<ExpandedArticle<string>> {
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

export const ArticleExpander = {
	fetchArticle,
	getArticle,
};
