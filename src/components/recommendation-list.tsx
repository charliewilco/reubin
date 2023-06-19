import { RecommendationCard } from "./recommendation-card";
import type { Feed } from "@prisma/client";
import type { RecommendedField } from "$/lib/recommendations";

interface RecommendationListItemProps {
	subscribed: Feed[];
	feeds: RecommendedField[];
	title: string;
}

export function RecommendationList(props: RecommendationListItemProps) {
	return (
		<section>
			<h2 className="text-lg opacity-50">{props.title}</h2>

			<ul role="list" className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{props.feeds.map((r) => {
					return (
						<li key={r.displayName} className="col-span-1">
							<RecommendationCard
								displayName={r.displayName}
								link={r.link}
								feeds={props.subscribed}
							/>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
