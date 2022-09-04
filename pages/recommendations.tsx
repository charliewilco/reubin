import type { InferGetStaticPropsType, NextPage } from "next";
import { RecommendedKeyArray } from "../server/recommended";

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
		<div>
			{recommended.map(([key, recommendedFeeds], idx) => {
				return (
					<div key={idx}>
						<h2>{key}</h2>

						<ul>
							{recommendedFeeds.map((r) => {
								return (
									<li key={r.displayName}>
										<h3>{r.displayName}</h3>

										<pre>{r.link}</pre>
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
};

export default RecommendationsPage;
