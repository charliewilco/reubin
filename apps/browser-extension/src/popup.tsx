import { createRoot } from "react-dom/client";
import { parseDocumentLinks } from "./parse-document";
import { getTabURL } from "./get-tab-url";
import { AvailableFeedList } from "./components/available-feeds";

const domNode = document.getElementById("app");

const currentTabUrl = getTabURL();

if (domNode !== null) {
	const root = createRoot(domNode);
	root.render(<AvailableFeedList id={currentTabUrl} onParse={parseDocumentLinks} />);
}
