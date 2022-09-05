import { useCallback, useMemo } from "react";
import { FiRss } from "react-icons/fi";
import { GetFeedsQuery } from "../../lib/types";
import { LoadingIndicator } from "./activity-indicator";

interface RecommendationCardProps {
	displayName: string;
	link: string;
	type?: "feed" | "twitter";
	feeds?: GetFeedsQuery;
	error?: any;
	onSubscribe(link: string): void;
}

export const RecommendationCard = ({
	displayName,
	link,
	onSubscribe,
	feeds,
	error,
}: RecommendationCardProps) => {
	const handleClick = useCallback(() => {
		return onSubscribe(link);
	}, [onSubscribe, link]);

	const isLoading = !error && !feeds;

	const hasFeed = useMemo(() => {
		if (feeds) {
			return feeds.feeds.findIndex((f) => f?.feedURL === link) > -1;
		}

		return false;
	}, [feeds, link]);

	let content = (
		<button
			onClick={handleClick}
			className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium  hover:text-gray-500">
			<FiRss className="h-5 w-5 text-zinc-400" aria-hidden="true" />
			<span className="ml-3">Subscribe</span>
		</button>
	);

	if (isLoading) {
		content = <LoadingIndicator />;
	}

	if (hasFeed) {
		content = (
			<div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium opacity-50  hover:text-gray-500">
				<FiRss className="h-5 w-5 text-zinc-400" aria-hidden="true" />
				<span className="ml-3">Subscribed</span>
			</div>
		);
	}

	return (
		<div className="divide-y divide-zinc-500 rounded-lg bg-white dark:bg-zinc-800">
			<div className="flex w-full items-center justify-between space-x-6 p-6">
				<div className="flex-1 truncate">
					<div className="flex items-center space-x-3">
						<h3 className="truncate text-sm font-medium">{displayName}</h3>
					</div>
					<p className="mt-1 truncate text-sm text-zinc-500">{link}</p>
				</div>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-zinc-500">
					<div className="flex w-0 flex-1">{content}</div>
				</div>
			</div>
		</div>
	);
};
