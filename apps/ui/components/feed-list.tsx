import { useMemo } from "react";
import useSWR from "swr";
import { useDashboardContext } from "../hooks/useDashboard";
import { getFeeds } from "../lib/graphql";
import { LoadingIndicator } from "./ui/activity-indicator";
import { classNames } from "./ui/class-names";

interface FeedItemProps {
  id: string;
  title: string;
  selected: null | { id: string; title: string };
  onSelect(id: string, title: string): void;
}

export const FeedItem = (props: FeedItemProps) => {
  const handleSelect = () => {
    if (props.id) {
      props.onSelect(props.id, props.title);
    }
  };

  const isSelected = useMemo(() => props.id === props.selected?.id, [props]);

  return (
    <li
      key={props.id}
      className={classNames("cursor-pointer p-2", isSelected && "bg-sky-500/50 text-white")}>
      <div className="flex justify-between">
        <div onClick={handleSelect} className="flex-1">
          <h2 className="text-base">{props.title}</h2>
          <pre className="text-xs opacity-25">{props.id}</pre>
        </div>
      </div>
    </li>
  );
};

export const FeedList = () => {
  const [{ feed: selectedFeed }, { selectFeed }] = useDashboardContext();
  const { data, error } = useSWR("feeds", getFeeds);

  const isLoading = !error && !data;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (data) {
    if (data.feeds.length === 0) {
      return (
        <div>
          <p>Looks like you have no feeds.</p>
        </div>
      );
    }
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full">
        <ul>
          {data.feeds.map((feed) =>
            feed === null ? null : (
              <FeedItem
                key={feed?.id}
                id={feed?.id}
                title={feed?.title}
                onSelect={selectFeed}
                selected={selectedFeed}
              />
            )
          )}
        </ul>
      </div>
    );
  }

  return null;
};
