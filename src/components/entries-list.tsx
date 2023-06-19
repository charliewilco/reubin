import type { Entry } from "@prisma/client";
import { Controllers } from "$/lib/controllers";
import type { EntryFilter } from "$/lib/filters";
import { EntryListItem } from "./entry-list-item";
import { FeedToolbar } from "./feed-toolbar";

interface EntriesListProps {
	feedId: string;
	filter: EntryFilter;
}

function sortByNearest({ pubDate: a }: Entry, { pubDate: b }: Entry) {
	const now = Date.now();
	return (
		Math.abs(Date.parse(a.toDateString()) - now) - Math.abs(Date.parse(b.toDateString()) - now)
	);
}

export async function EntriesList(props: EntriesListProps) {
	// let authRequest = Auth.handleRequest({ cookies: cookies });
	// const { user } = await authRequest.validateUser();

	let entries = await Controllers.entry.getByFeed(props.feedId, props.filter);

	return (
		<div className="absolute left-0 top-0 w-full">
			<FeedToolbar id={props.feedId} />
			<ul className="divide-y">
				{entries.sort(sortByNearest).map((entry) => {
					return <EntryListItem key={entry.id} entry={entry} filter={props.filter} />;
				})}
			</ul>
		</div>
	);
}
