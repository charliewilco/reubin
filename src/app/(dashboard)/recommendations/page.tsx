import type { Metadata } from "next";
import { RecommendationMap } from "$/lib/recommendations";
import { RecommendationList } from "$/components/recommendation-list";
import { Services } from "$/lib/services";

export const metadata: Metadata = {
	title: "Recommended Feeds",
};

async function RecommendationsPage() {
	let lists = Array.from(RecommendationMap);

	let { user } = await Services.getUserSession();

	let subscribed =
		(await Services.db.feed.findMany({
			where: {
				userId: user?.userId,
			},
		})) ?? [];

	return (
		<div className="mx-auto max-w-7xl space-y-16">
			<div className="space-y-8 px-2 pb-8 pt-8">
				<h1 className="text-3xl font-bold tracking-tight">Recommended Feeds</h1>

				{lists.map(([title, recommendations], idx) => {
					let key = title.concat("-", idx.toString());
					return (
						<RecommendationList
							subscribed={subscribed}
							title={title}
							feeds={recommendations}
							key={key}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default RecommendationsPage;
