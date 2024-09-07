import { EntryListItem } from "$/components/entry-list-item";
import { FeedToolbar } from "$/components/feed/toolbar";
import { getByFeed } from "$/lib/controllers/entry";
import type { EntryFilter } from "$/lib/filters";
import { sortEntriesByNearest } from "$/utils/entries";

interface EntriesParams {
	feed: string;
	filter: EntryFilter;
}

export default async function EntriesPage({
	params,
}: {
	params: EntriesParams;
}) {
	let entries = await getByFeed(params.feed, params.filter);

	return (
		<div className="absolute left-0 top-0 w-full">
			<FeedToolbar id={params.feed} filter={params.filter} />
			<ul>
				{entries.sort(sortEntriesByNearest).map((entry) => {
					return <EntryListItem key={entry.id} entry={entry} filter={params.filter} />;
				})}
			</ul>
		</div>
	);
}
