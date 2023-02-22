import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import { parseDocumentLinks } from "./parse-document";
import { createTab, getTabURL } from "./get-tab-url";
import { App } from "./app";

let domNode = document.getElementById("app");
let currentTabUrl = getTabURL();

let provider = () => new Map();

if (domNode !== null) {
	let root = createRoot(domNode);
	root.render(
		<StrictMode>
			<SWRConfig
				value={{
					provider,
				}}>
				<App id={currentTabUrl} onParse={parseDocumentLinks} onAddLink={createTab} />
			</SWRConfig>
		</StrictMode>
	);
}
