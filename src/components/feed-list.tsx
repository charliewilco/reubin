import { getUserSession } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";
import { FeedListItem } from "./feed-list-item";
import { FeedNavigation } from "./feed-navigation";
import { EmptyFeedList } from "./feed-list-empty";

interface FeedListProps {
	currentFilter: string;
}

export async function FeedList(props: FeedListProps) {
	const { user } = await getUserSession();

	let feeds = await Controllers.feed.getAll(user?.userId);

	if (feeds) {
		if (feeds.length === 0) {
			return <EmptyFeedList />;
		}

		return (
			<div className="w-full">
				<div>
					<FeedNavigation />
					<ul role="list">
						{feeds.map((feed) =>
							feed === null ? null : (
								<FeedListItem
									key={feed?.id}
									id={feed?.id}
									title={feed?.title}
									filter={props.currentFilter}
								/>
							)
						)}
					</ul>
				</div>
			</div>
		);
	}

	return null;
}
