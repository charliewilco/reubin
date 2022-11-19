import { NEWS, TECH, RecommendationList } from "../../../components/recommendation-list";

function RecommendationsPage() {
	return (
		<div className="mx-auto max-w-7xl space-y-16">
			<div className="space-y-8 px-2 pb-8">
				<RecommendationList title="News" feeds={NEWS} />
				<RecommendationList title="Tech" feeds={TECH} />
			</div>
		</div>
	);
}

export default RecommendationsPage;
