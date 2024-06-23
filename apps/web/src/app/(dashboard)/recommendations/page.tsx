import { RecommendationList } from "$/components/recommendations/list";
import { getUserSession } from "$/lib/controllers/session";
import { prisma } from "$/lib/db";
import { RecommendationMap } from "$/lib/recommendations";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Recommended Feeds",
};

async function RecommendationsPage() {
	let lists = Array.from(RecommendationMap);

	let result = await getUserSession();

	let subscribed =
		(await prisma.feed.findMany({
			where: {
				userId: result?.user?.id,
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
