import type { RSSLink } from "./rss";

export function createAddLink(link: RSSLink) {
	let baseURL: string = "";

	if (process.env.ENV === "development" || process.env.ENV === "test") {
		baseURL = "http://localhost:3000";
	} else {
		baseURL = "https://reubin.app";
	}

	let url = new URL("/add-feed", baseURL);

	url.searchParams.append("url", link.href);

	return url.toString();
}
