import { getByFeed } from "$/lib/controllers/entry";
import type { EntryFilter } from "$/lib/filters";
import { sortEntriesByNearest } from "$/utils/entries";
import { EntryListItem } from "./entry-list-item";
import { FeedToolbar } from "./feed/toolbar";

interface EntriesListProps {
	feedId: string;
	filter: EntryFilter;
}

export async function EntriesList({ filter, feedId }: EntriesListProps) {
	let entries = await getByFeed(feedId, filter);

	return (
		<div className="absolute left-0 top-0 w-full">
			<FeedToolbar id={feedId} filter={filter} />
			<ul>
				{entries.sort(sortEntriesByNearest).map((entry) => {
					return <EntryListItem key={entry.id} entry={entry} filter={filter} />;
				})}
			</ul>
		</div>
	);
}
