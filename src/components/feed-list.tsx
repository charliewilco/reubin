import Link from "next/link";
import { getUserSession } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";
import { RecommendationMap, RecommendedField } from "$/lib/recommendations";
import { FeedListItem } from "./feed-list-item";
import { RecommendationCard } from "./recommendation-card";
import { FeedNavigation } from "./feed-navigation";

export function EmptyFeedList() {
	let recommendations = RecommendationMap.get("Relevant") ?? [];
	return (
		<div className="flex h-full flex-col-reverse justify-center gap-8 p-4">
			<p>
				<span className="opacity-75">
					Looks like you have no feeds. Maybe you should add some?
				</span>{" "}
				<Link href="/recommendations" className="text-sky-500">
					Find more here.
				</Link>
			</p>

			<ul className="space-y-4 text-left">
				{recommendations.map((r: RecommendedField) => {
					return <RecommendationCard {...r} key={r.link} feeds={[]} />;
				})}
			</ul>
		</div>
	);
}

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
