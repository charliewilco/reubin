import { Controllers } from "$/lib/controllers";
import type { EntryFilter } from "$/lib/filters";
import { sortEntriesByNearest } from "$/utils/entries";
import { FeedToolbar } from "./feed-toolbar";
import { EntryListItem } from "./entry-list-item";
import { unstable_cache } from "next/cache";

interface EntriesListProps {
	feedId: string;
	filter: EntryFilter;
}

export async function EntriesList(props: EntriesListProps) {
	let entries = await unstable_cache(
		() => Controllers.entry.getByFeed(props.feedId, props.filter),
		[props.filter, props.feedId],
		{
			tags: [`feed:${props.feedId}`, `filter:${props.filter}`],
		}
	)();

	return (
		<div className="absolute left-0 top-0 w-full">
			<FeedToolbar id={props.feedId} filter={props.filter} />
			<ul>
				{entries.sort(sortEntriesByNearest).map((entry) => {
					return <EntryListItem key={entry.id} entry={entry} filter={props.filter} />;
				})}
			</ul>
		</div>
	);
}
