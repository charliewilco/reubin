import { useCallback } from "react";
import { FiRss } from "react-icons/fi";
import { addFeed } from "../../lib/fetcher";

interface RecommendationCardProps {
	displayName: string;
	link: string;
	type?: "feed" | "twitter";
}

export const RecommendationCard = ({ displayName, link }: RecommendationCardProps) => {
	const handleClick = useCallback(() => {
		return addFeed(link);
	}, [link]);

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
					<div className="flex w-0 flex-1">
						<button
							onClick={handleClick}
							className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium  hover:text-gray-500">
							<FiRss className="h-5 w-5 text-zinc-400" aria-hidden="true" />
							<span className="ml-3">Subscribe</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
