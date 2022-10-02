import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Loading } from "./loading";
import { List } from "./list";

interface AvailableFeedListProps {
  onSearch: () => Promise<RSSLink[]>;
}

export function AvailableFeedList(props: AvailableFeedListProps) {
  let content = null;
  const [state, setState] = useState<{
    hasChecked: boolean;
    availableFeeds: RSSLink[];
  }>({ hasChecked: false, availableFeeds: [] });
  useEffect(() => {
    if (!state.hasChecked) {
      props.onSearch().then((links) => {
        setState({
          hasChecked: true,
          availableFeeds: links ?? [],
        });
      });
    }
  }, []);

  if (!state.hasChecked) {
    content = <Loading />;
  } else if (state.availableFeeds.length === 0) {
    content = (
      <p>
        <span className="opacity-50">No feeds found.</span>{" "}
        <a className="text-sky-500 dark:text-sky-600" href="https://reubin.app">
          Learn more here.
        </a>
      </p>
    );
  } else {
    content = <List data={state.availableFeeds} />;
  }

  return (
    <div>
      <h1 className="mb-4 flex-1 text-xl font-semibold">Available Feeds</h1>
      {content}
    </div>
  );
}
