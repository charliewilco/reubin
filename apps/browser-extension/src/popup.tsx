import { h, render } from "preact";
import { parseDocumentLinks } from "./lib/parse-document";
import { AvailableFeedList } from "./components/available-feed-list";

const root = document.getElementById("app");

if (root !== null) {
  render(<AvailableFeedList onSearch={parseDocumentLinks} />, root);
}
