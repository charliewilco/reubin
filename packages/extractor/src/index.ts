import * as cheerio from "cheerio";
import { getTagName } from "./element";
import { REGEXPS } from "./regex";
import { mergeOptions } from "./options";
import type { ReadabilityOptions } from "./options";

interface ExtractorMetadata {
	title?: string;
	byline?: string;
	excerpt?: string;
	siteName?: string;
	publishedTime?: string;
}

type $Element = cheerio.Cheerio<cheerio.Element | cheerio.Document>;

interface Candidate {
	score: number;
	element: $Element;
}

export class ContentExtractor {
	private readonly FLAG_STRIP_UNLIKELYS = 0x1;
	private readonly FLAG_WEIGHT_CLASSES = 0x2;
	private readonly FLAG_CLEAN_CONDITIONALLY = 0x4;
	private readonly CLASSES_TO_PRESERVE = ["page"];

	private readonly DIV_TO_P_ELEMS = new Set([
		"BLOCKQUOTE",
		"DL",
		"DIV",
		"IMG",
		"OL",
		"P",
		"PRE",
		"TABLE",
		"UL",
	]);

	readonly options: ReadabilityOptions;

	constructor(options: Partial<ReadabilityOptions> = {}) {
		this.options = {
			...mergeOptions(options),
			serializer: options.serializer || this._defaultSerializer,
		};
	}

	private _prepDocument($: cheerio.CheerioAPI): void {
		// Remove unwanted elements
		$("script, style, noscript, iframe, object, embed, footer").remove();

		// Remove hidden elements
		$("*").each((_, element) => {
			const $element: $Element = $(element) as $Element;
			if (!this._isProbablyVisible($element)) {
				$element.remove();
			}
		});

		// Remove elements with negative scores
		$("*").each((_, element) => {
			const $element = $(element);
			const unlikelyMatch = $element.attr("class")?.match(REGEXPS.unlikelyCandidates);
			const okMaybeMatch = $element.attr("class")?.match(REGEXPS.okMaybeItsACandidate);

			if (unlikelyMatch && !okMaybeMatch) {
				$element.remove();
			}
		});

		// Remove empty or single-character paragraphs
		$("p")
			.filter((_, element) => {
				return $(element).text().trim().length <= 1;
			})
			.remove();

		// Convert div elements to paragraphs
		$("div").each((_, element) => {
			const $element = $(element);
			if (!this._hasChildBlockElement($element)) {
				const result = $element.html();
				if (result !== null) {
					$element.replaceWith($("<p>").html(result));
				}
			}
		});
	}

	private _isProbablyVisible($element: $Element): boolean {
		// Check if the element is probably visible based on certain criteria
		const style = $element.attr("style");
		const classNames = $element.attr("class");

		return (
			!style ||
			(!style.includes("display:none") &&
				!style.includes("visibility:hidden") &&
				!classNames?.includes("hidden"))
		);
	}

	private _hasChildBlockElement($element: $Element): boolean {
		// Check if the element has any child block-level elements
		return $element.find(Array.from(this.DIV_TO_P_ELEMS).join(",")).length > 0;
	}
	private _getArticleMetadata($: cheerio.CheerioAPI): ExtractorMetadata {
		const metadata: ExtractorMetadata = {};

		// Extract title
		const titleElement = $(
			'meta[property="og:title"], meta[name="twitter:title"], meta[itemprop="name"]',
		);
		if (titleElement.length > 0) {
			metadata.title = titleElement.attr("content")?.trim();
		}

		// Extract byline
		const bylineElement = $(
			'meta[name="author"], meta[property="article:author"], meta[itemprop="author"]',
		);
		if (bylineElement.length > 0) {
			metadata.byline = bylineElement.attr("content")?.trim();
		}

		// Extract excerpt
		const excerptElement = $(
			'meta[name="description"], meta[property="og:description"], meta[itemprop="description"]',
		);
		if (excerptElement.length > 0) {
			metadata.excerpt = excerptElement.attr("content")?.trim();
		}

		// Extract site name
		const siteNameElement = $('meta[property="og:site_name"]');
		if (siteNameElement.length > 0) {
			metadata.siteName = siteNameElement.attr("content")?.trim();
		}

		// Extract published time
		const publishedTimeElement = $(
			'meta[property="article:published_time"], meta[itemprop="datePublished"]',
		);
		if (publishedTimeElement.length > 0) {
			metadata.publishedTime = publishedTimeElement.attr("content")?.trim();
		}

		return metadata;
	}

	private _grabArticle($: cheerio.CheerioAPI): $Element | null {
		const candidates: Candidate[] = [];

		// Find potential candidate elements
		$("p, pre, td, blockquote").each((_, element) => {
			const $element = $(element);
			const innerText = $element.text().trim();

			if (innerText.length >= this.options.charThreshold) {
				const score = this._getElementScore($element);
				candidates.push({ score, element: $element });
			}
		});

		if (candidates.length === 0) {
			return null;
		}

		// Sort candidates by score in descending order
		candidates.sort((a, b) => b.score - a.score);

		// Find the top candidate and its parent element
		const topCandidate = candidates[0].element;
		const parentElement = topCandidate.parent();

		// Check if the parent element has a higher score or if it's a better candidate
		if (parentElement) {
			const parentScore = this._getElementScore(parentElement);
			if (parentScore > candidates[0].score) {
				return parentElement;
			}
		}

		// If no parent element has a higher score, return the top candidate
		return topCandidate;
	}

	private _getElementScore($element: $Element): number {
		let score = 0;

		// Add points for element's class and ID
		const className = $element.attr("class");
		const id = $element.attr("id");

		if (className) {
			if (REGEXPS.positive.test(className)) {
				score += 25;
			}
			if (REGEXPS.negative.test(className)) {
				score -= 25;
			}
		}

		if (id) {
			if (REGEXPS.positive.test(id)) {
				score += 25;
			}
			if (REGEXPS.negative.test(id)) {
				score -= 25;
			}
		}

		// Add points for element's tag name
		const tagName = getTagName($element);
		if (tagName === "article" || tagName === "section") {
			score += 15;
		} else if (tagName === "div" || tagName === "p") {
			score += 5;
		} else if (tagName === "pre" || tagName === "td" || tagName === "blockquote") {
			score += 3;
		} else if (
			tagName === "address" ||
			tagName === "ol" ||
			tagName === "ul" ||
			tagName === "dl" ||
			tagName === "dd" ||
			tagName === "dt" ||
			tagName === "li" ||
			tagName === "form"
		) {
			score -= 3;
		} else if (
			tagName === "h1" ||
			tagName === "h2" ||
			tagName === "h3" ||
			tagName === "h4" ||
			tagName === "h5" ||
			tagName === "h6" ||
			tagName === "th"
		) {
			score -= 5;
		}

		return score;
	}

	private _postProcessContent($: cheerio.CheerioAPI, $articleContent: $Element): void {
		// this is a stub for post-processing the article content
	}

	async parse(url: string): Promise<ExtractorResult | null> {
		try {
			const response = await fetch(url);
			const html = await response.text();
			const $ = cheerio.load(html);

			$("script").remove();

			this._prepDocument($);

			const metadata = this._getArticleMetadata($);
			const articleTitle = metadata.title || "";

			const articleContent = this._grabArticle($);
			if (!articleContent) {
				return null;
			}

			this._postProcessContent($, articleContent);

			if (!metadata.excerpt) {
				const paragraphs = $(articleContent).find("p");
				if (paragraphs.length > 0) {
					metadata.excerpt = $(paragraphs[0]).text().trim();
				}
			}

			const textContent = $(articleContent).text();

			return {
				title: articleTitle,
				byline: metadata.byline || "",
				dir: this._getArticleDir($),
				lang: this._getArticleLanguage($),
				content: $.html(articleContent),
				textContent,
				length: textContent.length,
				excerpt: metadata.excerpt || "",
				siteName: metadata.siteName || "",
				publishedTime: metadata.publishedTime || "",
			};
		} catch (error) {
			console.error("Error parsing URL:", error);
			return null;
		}
	}

	private _defaultSerializer(element: cheerio.CheerioAPI): string {
		// @ts-ignore
		const r = cheerio.html(element, {});

		return r;
	}

	private _getArticleDir($: cheerio.CheerioAPI): string {
		// Implement the logic to determine the article's text direction
		// You can use the 'dir' attribute or language-specific heuristics
		return "ltr"; // Default to 'ltr' if not determined
	}

	private _getArticleLanguage($: cheerio.CheerioAPI): string {
		// Implement the logic to determine the article's language
		// You can use the 'lang' attribute or language detection libraries
		return "en"; // Default to 'en' if not determined
	}
}

export interface ExtractorResult {
	title: string;
	byline: string;
	dir: string;
	lang: string;
	content: string;
	textContent: string;
	length: number;
	excerpt: string;
	siteName: string;
	publishedTime: string;
}
