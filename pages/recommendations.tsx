import type { InferGetStaticPropsType, NextPage } from "next";
import { RecommendedKeyArray } from "../server/recommended";
import { RecommendationCard } from "../components/ui/recommendation-card";

export const getStaticProps = async () => {
	return {
		props: {
			recommended: RecommendedKeyArray,
		},
	};
};

const RecommendationsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	recommended,
}) => {
	return (
		<div className="mx-auto max-w-7xl space-y-16 pt-16">
			{recommended.map(([key, recommendedFeeds], idx) => {
				return (
					<section key={idx}>
						<h2 className="text-lg opacity-50">{key}</h2>

						<ul
							role="list"
							className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{recommendedFeeds.map((r) => (
								<li key={r.displayName} className="col-span-1">
									<RecommendationCard displayName={r.displayName} link={r.link} />
								</li>
							))}
						</ul>
					</section>
				);
			})}
		</div>
	);
};

export default RecommendationsPage;
