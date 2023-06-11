import { FeatureList } from "$/components/promo/features";
import { Services } from "$/components/promo/services";
import { Hero } from "$/components/promo/hero";
import { CTA } from "$/components/promo/call-to-action";

function IndexPage() {
	return (
		<div className="mx-auto mb-32 max-w-7xl space-y-32 px-2 pt-32">
			<Hero />
			<CTA />
			<FeatureList />
			<Services />
		</div>
	);
}

export default IndexPage;
