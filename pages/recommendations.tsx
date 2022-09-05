import type { InferGetStaticPropsType, NextPage } from "next";
import { RecommendedKeyArray } from "../server/recommended";
import { RecommendationList } from "../components/recommendation-list";

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
			<RecommendationList recommended={recommended} />
		</div>
	);
};

export default RecommendationsPage;
