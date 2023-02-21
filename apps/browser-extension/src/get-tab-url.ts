export function getTabURL() {
	let currentTabUrl = "";
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var currentTab = tabs[0];
		currentTabUrl = currentTab.url!;
		console.log(currentTabUrl);
	});

	return currentTabUrl;
}
