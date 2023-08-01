import { FeatureList } from "$/components/promo/features";
import { SocialServices } from "$/components/promo/social-services";
import { Hero } from "$/components/promo/hero";
import { CallToAction } from "$/components/promo/call-to-action";
import { SiteFooter } from "$/components/site-footer";

function IndexPage() {
	return (
		<div>
			<div className="mx-auto mb-32 max-w-7xl space-y-64 px-2 pt-32">
				<Hero />
				<CallToAction />
				<SocialServices />
				<FeatureList />
			</div>
			<SiteFooter />
		</div>
	);
}

export default IndexPage;
