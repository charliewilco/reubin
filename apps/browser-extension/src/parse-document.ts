export function parseDocumentLinks() {
	return new Promise<RSSLink[]>((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0] && tabs[0].id) {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ text: "searchRSS", url: tabs[0].url },
					(feeds: RSSLink[]) => resolve(feeds)
				);
			}
		});
	});
}
