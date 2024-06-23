import { FeedListItem } from "$/components/feed/feed-list-item";
import { EmptyFeedList } from "$/components/feed/list-empty";
import { getAll } from "$/lib/controllers/feed";
import { getUserSession } from "$/lib/controllers/session";
import type { EntryFilter } from "$/lib/filters";

interface Params {
	filter: EntryFilter;
}

export default async function FeedPage({ params }: { params: Params }) {
	const result = await getUserSession();

	let feeds = await getAll(result?.user?.id);
	console.log(feeds);

	if (feeds) {
		if (feeds.length === 0) {
			return <EmptyFeedList />;
		}

		return (
			<div>
				<ul>
					{feeds.map((feed) => (
						<FeedListItem
							key={feed?.id}
							id={feed?.id}
							title={feed?.title}
							filter={params.filter}
						/>
					))}
				</ul>
			</div>
		);
	}

	return null;
}
