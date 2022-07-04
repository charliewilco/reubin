import { useEntries } from "../hooks/useEntries";
import type { EntryDetailsFragment } from "../lib/types";
import { classNames } from "./ui/class-names";

interface EntryListProps {
	feedID: string;
	onSelect(id: string): void;
}

interface EntryListItemProps {
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
			className={classNames("border-b border-zinc-700 p-2", !props.isUnread && "opacity-25")}>
			<h3 className="mb-2 text-lg font-bold">{props.title}</h3>
			<button onClick={handleSelect}>Select</button>
		</li>
	);
};

export const EntryList = (props: EntryListProps) => {
	const { data } = useEntries(props.feedID);

	return (
		<div className="absolute top-0 left-0">
			<ul>
				{data?.entries.sort(sortByNearest).map((entry) => {
					const isUnread = !!entry?.unread;

					return (
						<EntryListItem
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
