"use client";

import format from "date-fns/format";

import type { EntryFilter } from "$/lib/filters";
import { classNames } from "./ui/class-names";
import { FeedToolbar } from "./feed-toolbar";

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

export function _EntryItem(props: EntryListItemProps) {
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

export function EntryList() {
	return (
		<div className="absolute left-0 top-0 w-full">
			<FeedToolbar onRefresh={() => {}} />
		</div>
	);
}
