import type { RSSMessageRequest } from "./message";

export async function parseDocumentLinks() {
	try {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (!tab.id || !tab.url) {
			throw new Error("No tab id");
		}

		const response = await chrome.tabs.sendMessage<RSSMessageRequest, RSSLink[]>(tab.id, {
			text: "searchRSS",
			url: tab.url,
		});

		if (!response) {
			throw new Error("No response");
		}

		return response;
	} catch (error: any) {
		throw new Error(error);
	}
}
