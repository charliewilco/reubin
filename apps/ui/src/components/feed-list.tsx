import { memo, useCallback, useMemo } from "react";
import isEqual from "react-fast-compare";
import useSWR from "swr";
import { useDashboardContext } from "../hooks/useDashboard";
import { getFeeds } from "../lib/graphql";
import { mapTagsToFeed } from "../lib/map-tags-feed";
import type { GetFeedsQuery } from "../lib/__generated__";
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

  const listProps = isSelected ? { "data-testid": "selected" } : {};
  return (
    <li
      {...listProps}
      key={props.id}
      className={classNames("cursor-pointer p-2", isSelected && "bg-sky-500/50 text-white")}>
      <div className="flex justify-between">
        <div onClick={handleSelect} className="flex-1">
          <h2 className="text-base">{props.title}</h2>
        </div>
      </div>
    </li>
  );
};

interface FeedsSortedByTagProps extends GetFeedsQuery {}

const FeedsSortedByTag = memo((props: FeedsSortedByTagProps) => {
  const [{ feed: selectedFeed }, { selectFeed }] = useDashboardContext();

  const sorted = useMemo(() => mapTagsToFeed(props), [props]);

  const getTitle = useCallback(
    (tagId: string) => {
      const tag = props.tags.find((t) => t?.id === tagId);
      return tag?.title;
    },
    [props]
  );

  return (
    <div>
      {sorted.map(([tagId, feeds]) => {
        if (tagId == null) {
          return (
            <ul role="list" key="null-tag">
              {feeds.map((feed) =>
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
          );
        } else {
          return (
            <div key={tagId}>
              <details>
                <summary className="block text-xs font-bold uppercase tracking-wide">
                  {getTitle(tagId)}
                </summary>

                <ul role="list" key="null-tag">
                  {feeds.map((feed) =>
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
              </details>
            </div>
          );
        }
      })}
    </div>
  );
}, isEqual);

FeedsSortedByTag.displayName = "MemoFeedsSortedByTag";

export const FeedList = () => {
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
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full">
        <FeedsSortedByTag {...data} />
      </div>
    );
  }

  return null;
};
