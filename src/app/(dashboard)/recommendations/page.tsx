import { RecommendationMap } from "$/lib/recommendations";
import { cookies } from "next/headers";
import { RecommendationList } from "$/components/recommendation-list";
import { Auth } from "$/lib/auth";
import { ORM } from "$/lib/orm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Recommended Feeds",
};

async function RecommendationsPage() {
	let lists = Array.from(RecommendationMap);

	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();

	let subscribed = await ORM?.feed.findMany({
		where: {
			userId: user.userId,
		},
	});

	subscribed = subscribed ?? [];

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
