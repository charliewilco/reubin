import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { parseDocumentLinks } from "../lib/search";
import { Loading } from "./loading";
import { List } from "./list";

const availableFeeds = signal<RSSLink[]>([]);
const hasChecked = signal(false);

export function AvailableFeedList() {
  let content = null;
  useEffect(() => {
    if (!hasChecked.value) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var url = tabs[0].url;
        parseDocumentLinks({}, url).then((links) => {
          console.log(links);
          availableFeeds.value = links;
          hasChecked.value = true;
        });
      });
    }
  }, []);

  if (!hasChecked.value) {
    content = <Loading />;
  }

  if (hasChecked.value && availableFeeds.value.length === 0) {
    content = (
      <p>
        No feeds found. <a href="https://reubin.app">Learn more</a>
      </p>
    );
  }

  content = <List data={availableFeeds.value} />;

  return (
    <div>
      <h1 className="mb-8 flex-1 text-2xl font-semibold">Available Feeds</h1>
      {content}
    </div>
  );
}
