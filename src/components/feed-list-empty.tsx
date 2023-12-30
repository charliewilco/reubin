import { RecommendationMap, type RecommendedField } from "$/lib/recommendations";
import Link from "next/link";
import { RecommendationCard } from "./recommendations/card";

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
