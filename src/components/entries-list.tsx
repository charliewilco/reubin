"use client";
import { memo, useCallback } from "react";
import isEqual from "react-fast-compare";
import useSWR from "swr";
import format from "date-fns/format";
import type { Entry } from "@prisma/client";

import type { EntryDetailsFragment, EntryFilter } from "../lib/__generated__";
import { classNames } from "./ui/class-names";
import { getEntriesFromFeed, refreshFeed } from "../lib/graphql";
import { FeedToolbar } from "./feed-toolbar";
import { useDashboardContext } from "../hooks/useDashboard";

interface EntryListProps {
	filter?: EntryFilter;
	selectedEntry: null | string;
	id: string;
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

function sortByNearest({ pubDate: a }: Entry, { pubDate: b }: Entry) {
	const now = Date.now();
	return (
		Math.abs(Date.parse(a.toDateString()) - now) - Math.abs(Date.parse(b.toDateString()) - now)
	);
}

function _EntryItem(props: EntryListItemProps) {
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
}

export const EntryListItem = memo(_EntryItem, isEqual);

EntryListItem.displayName = "EntryListItem";

export function EntryList(props: EntryListProps) {
	const { data, mutate } = useSWR([props.id, props.filter], ([id, filter]) =>
		getEntriesFromFeed(id, filter)
	);

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
		<div className="absolute left-0 top-0 w-full">
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
}

export function ConnectedEntryList(props: Pick<EntryListProps, "filter">) {
	const [{ feed, entry }, { selectEntry }] = useDashboardContext();

	if (feed) {
		return <EntryList {...props} id={feed} onSelect={selectEntry} selectedEntry={entry} />;
	}

	return null;
}
