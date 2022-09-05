import useSWR from "swr";
import type { EntryDetailsFragment } from "../lib/types";
import { classNames } from "./ui/class-names";
import { getEntriesFromFeed } from "../lib/fetcher";

interface EntryListProps {
	selected: null | string;
	feedID: string;
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

export const EntryListItem = (props: EntryListItemProps) => {
	const handleSelect = () => {
		props.onSelect(props.id);
	};

	return (
		<li
			className={classNames(
				"cursor-pointer border-b border-zinc-200 p-2 dark:border-zinc-700",
				props.isSelected && "bg-sky-600/50 text-white",
				!props.isUnread && "opacity-50"
			)}
			onClick={handleSelect}>
			<div className={classNames("p-2")}>
				<h3 className="text-lg font-bold">{props.title}</h3>
			</div>
		</li>
	);
};

export const EntryList = (props: EntryListProps) => {
	const { data } = useSWR(props.feedID, getEntriesFromFeed);

	// const isLoading = !error && !data;

	return (
		<div className="absolute top-0 left-0 w-full">
			<ul>
				{data?.entries.sort(sortByNearest).map((entry) => {
					const isUnread = !!entry?.unread;

					return (
						<EntryListItem
							isSelected={entry.id === props.selected}
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
