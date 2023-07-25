import type { Feed } from "@prisma/client";
import { Rss, CheckCircle } from "lucide-react";
import { addFeedFromRecommendation } from "$/actions";

interface RecommendationCardProps {
	displayName: string;
	link: string;
	feeds?: Feed[];
}

export function RecommendationCard(props: RecommendationCardProps) {
	let feeds = props.feeds ?? [];

	const hasFeed = feeds.findIndex((f) => f?.feedURL === props.link) > -1;

	let content = (
		<form action={addFeedFromRecommendation} className="block w-full text-center">
			<input type="hidden" name="link" value={props.link} />
			<button
				type="submit"
				className="flex w-full items-center rounded-bl-lg border border-transparent p-4 text-sm font-medium hover:text-gray-500">
				<Rss className="h-5 w-5 text-zinc-400" aria-hidden="true" />
				<span className="ml-3">Subscribe</span>
			</button>
		</form>
	);

	if (hasFeed) {
		content = (
			<div className="relative -mr-px inline-flex w-0 flex-1 items-center rounded-bl-lg border border-transparent p-4 text-sm font-medium opacity-50 hover:text-gray-500">
				<CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
				<span className="ml-3">Subscribed</span>
			</div>
		);
	}

	return (
		<div className="rounded-lg bg-zinc-100 shadow dark:bg-zinc-800 dark:shadow-zinc-500/50">
			<div className="flex w-full items-center justify-between">
				<div className="flex-1 truncate p-4">
					<h3 className="truncate text-base font-medium">{props.displayName}</h3>
					<p className="mt-1 truncate font-mono text-xs text-zinc-500">{props.link}</p>
				</div>
			</div>
			<div className="flex-1">
				<div className="flex">{content}</div>
			</div>
		</div>
	);
}
