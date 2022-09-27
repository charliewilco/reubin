import { memo, useCallback } from "react";
import useSWR from "swr";
import type { EntryDetailsFragment, EntryFilter } from "../lib/__generated__";
import { classNames } from "./ui/class-names";
import { getEntriesFromFeed, refreshFeed } from "../lib/graphql";
import { FeedToolbar } from "./feed-toolbar";
import format from "date-fns/format";

interface EntryListProps {
  filter?: EntryFilter;
  selectedEntry: null | string;
  id: string;
  title: string;
  onSelect(id: string): void;
}

interface EntryListItemProps {
  isSelected: boolean;
  onSelect(id: string): void;
  title: string;
  id: string;
  isUnread: boolean;
  published: string;
}

function sortByNearest(
  { published: a }: EntryDetailsFragment,
  { published: b }: EntryDetailsFragment
) {
  const now = Date.now();
  return Math.abs(Date.parse(a) - now) - Math.abs(Date.parse(b) - now);
}

export const EntryListItem = memo((props: EntryListItemProps) => {
  const handleSelect = () => {
    props.onSelect(props.id);
  };

  const date = format(new Date(props.published), "MMM d, yyyy");

  return (
    <li
      className={classNames(
        "cursor-pointer border-b border-zinc-200 dark:border-zinc-700",
        !props.isUnread && "opacity-50",
        props.isSelected && "bg-sky-500/50 text-white opacity-100"
      )}
      onClick={handleSelect}>
      <div className="p-4">
        <h3 className="mb-2 text-base">{props.title}</h3>
        <p className="text-xs uppercase tracking-wide">{date}</p>
      </div>
    </li>
  );
});

EntryListItem.displayName = "EntryListItem";

export const EntryList = (props: EntryListProps) => {
  const { data, mutate } = useSWR([props.id, props.filter], getEntriesFromFeed);

  // const isLoading = !error && !data;

  const handleRefresh = useCallback(async () => {
    const result = await refreshFeed(props.id);

    mutate(
      (prev) => {
        if (prev && result.refreshFeed) {
          // TODO: write mutation to call refresh on feed.
          const entries: EntryDetailsFragment[] = [...result.refreshFeed, ...prev.entries];
          return { ...prev, entries };
        }
      },
      { rollbackOnError: true }
    );
  }, [mutate, props.id]);

  return (
    <div className="absolute top-0 left-0 w-full">
      <FeedToolbar onRefresh={handleRefresh} />

      <ul>
        {data?.entries.sort(sortByNearest).map((entry) => {
          const isUnread = !!entry?.unread;

          return (
            <EntryListItem
              isSelected={entry.id === props.selectedEntry}
              key={entry.id}
              title={entry.title}
              id={entry.id}
              isUnread={isUnread}
              published={entry.published}
              onSelect={props.onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
};