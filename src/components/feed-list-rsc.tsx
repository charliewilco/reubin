import Link from "next/link";
import { cookies } from "next/headers";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";
import { classNames } from "./ui/class-names";

interface FeedItemProps {
	id: string;
	title: string;
	filter: string;
}

export function FeedItem(props: FeedItemProps) {
	let isSelected = false;

	const listProps = isSelected ? { "data-testid": "selected" } : {};
	return (
		<li
			{...listProps}
			key={props.id}
			className={classNames("cursor-pointer p-2", isSelected && "bg-sky-500/50 text-white")}>
			<div className="flex justify-between">
				<Link href={`/${props.filter}/${props.id}/`} className="flex-1">
					<h2 className="text-base">{props.title}</h2>
				</Link>
			</div>
		</li>
	);
}

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

		let selectFeed = () => {};

		return (
			<div className="w-full">
				<div>
					<ul role="list">
						{feeds.map((feed) =>
							feed === null ? null : (
								<FeedItem
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
