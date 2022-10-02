export function parseDocumentLinks(_root, url: string) {
  return new Promise<RSSLink[]>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { text: "searchRSS", url: url },
        (feeds: RSSLink[]) => resolve(feeds)
      );
    });
  });
}
