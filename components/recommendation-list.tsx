import { useCallback } from "react";
import useSWR from "swr";
import { addFeed, getFeeds } from "../lib/fetcher";
import { RecommendationCard } from "./ui/recommendation-card";
import type { RecommendedField } from "../server/recommended";

interface RecommendationListProps {
	recommended: [string, RecommendedField[]][];
}

export const RecommendationList = ({ recommended }: RecommendationListProps) => {
	const { data, error, mutate } = useSWR("recommended feeds", getFeeds);

	const handleClick = useCallback(
		async (link: string) => {
			const data = await addFeed(link);

			await mutate((prevData) => {
				prevData?.feeds.push(data.addFeed);

				return prevData;
			});
		},
		[mutate]
	);

	return (
		<div className="space-y-8 pb-8">
			{error && <div>{error.toString()}</div>}
			{recommended.map(([key, recommendedFeeds], idx) => {
				return (
					<section key={idx}>
						<h2 className="text-lg opacity-50">{key}</h2>

						<ul
							role="list"
							className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{recommendedFeeds.map((r) => (
								<li key={r.displayName} className="col-span-1">
									<RecommendationCard
										displayName={r.displayName}
										link={r.link}
										feeds={data}
										error={error}
										onSubscribe={handleClick}
									/>
								</li>
							))}
						</ul>
					</section>
				);
			})}
		</div>
	);
};
