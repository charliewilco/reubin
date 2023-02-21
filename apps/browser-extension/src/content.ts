import type { RSSMessageRequest } from "./message";

chrome.runtime.onMessage.addListener((message: RSSMessageRequest, sender, sendResponse) => {
	if (message.text === "searchRSS") {
		let types = [
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
		let links: NodeListOf<HTMLLinkElement> = document.querySelectorAll("link[type]");
		const feeds: RSSLink[] = [];
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			if (link.hasAttribute("type") && types.indexOf(link.getAttribute("type")!) !== -1) {
				let feed_url = link.getAttribute("href");

				if (feed_url) {
					// If feed's url starts with "//"
					if (feed_url.indexOf("//") === 0) feed_url = "http:" + feed_url;
					// If feed's url starts with "/"
					else if (feed_url.startsWith("/"))
						feed_url = message.url.split("/")[0] + "//" + message.url.split("/")[2] + feed_url;
					else if (!/^(http|https):\/\//i.test(feed_url))
						feed_url = message.url + "/" + feed_url.replace(/^\//g, "");

					let feed = {
						type: link.getAttribute("type") ?? "application/rss+xml",
						href: feed_url,
						title: link.getAttribute("title") || feed_url,
					};
					feeds.push(feed);
				}
			}
		}
		console.log("FEEDS", feeds);
		sendResponse(feeds);
	}
});

export {};
