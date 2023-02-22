export function getTabURL() {
	let currentTabUrl = "";
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var currentTab = tabs[0];
		currentTabUrl = currentTab.url!;
	});

	return currentTabUrl;
}

export function createTab(newURL: string) {
	chrome.tabs.create({ url: newURL });
}
