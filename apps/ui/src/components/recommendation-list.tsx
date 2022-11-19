"use client";

import { useCallback } from "react";
import useSWR from "swr";
import { addFeed, getFeeds } from "../lib/graphql";

import { RecommendationCard } from "./ui/recommendation-card";

export type RecommendedField = { link: string; displayName: string };

export const NEWS = [
	{
		link: "https://www.vox.com/rss/index.xml",
		displayName: "Vox",
	},
	{
		link: "https://www.out.com/rss.xml",
		displayName: "Out.com",
	},
	{
		link: "https://www.buzzfeed.com/world.xml",
		displayName: "BuzzFeed World News",
	},
	{
		link: "https://nautil.us/rss/all",
		displayName: "Nautilus",
	},
	{
		link: "https://thedailywhat.cheezburger.com/rss",
		displayName: "Daily What",
	},
];

export const TECH = [
	{
		link: "https://xkcd.com/atom.xml",
		displayName: "xkcd",
	},
	{
		link: "https://www.theverge.com/web/rss/index.xml",
		displayName: "The Verge",
	},
	{
		link: "https://future.a16z.com/feed/",
		displayName: "Future",
	},
	{
		link: "https://cointelegraph.com/rss",
		displayName: "Coin Telegraph",
	},
];

interface RecommendationListItemProps {
	feeds: RecommendedField[];
	title: string;
}

export function RecommendationList(props: RecommendationListItemProps) {
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
		<section>
			<h2 className="text-lg opacity-50">{props.title}</h2>

			<ul role="list" className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{props.feeds.map((r) => (
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
}
