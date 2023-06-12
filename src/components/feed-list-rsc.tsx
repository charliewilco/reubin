import { cookies } from "next/headers";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";
import { FeedListItem } from "./feed-list-item"



interface FeedListProps {
	currentFilter: string;
}

export async function FeedList({ currentFilter }: FeedListProps) {
	let authRequest = Auth.handleRequest({ cookies: cookies });
	const { user } = await authRequest.validateUser();

	let feeds = await Controllers.feed.getAll(user.userId);

	if (feeds) {
		if (feeds.length === 0) {
			return (
				<div className=" p-4 text-center">
					<p>Looks like you have no feeds.</p>
				</div>
			);
		}


		return (
			<div className="w-full">
				<div>
					<ul role="list">
						{feeds.map((feed) =>
							feed === null ? null : (
								<FeedListItem
									key={feed?.id}
									id={feed?.id}
									title={feed?.title}
									filter={currentFilter}
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
