import { FeatureList } from "$/components/promo/features";
import { SocialServices } from "$/components/promo/social-services";
import { SiteFooter } from "$/components/site-footer";
import { CallToAction } from "./call-to-action";
import { Hero } from "./hero";
import styles from "./home.module.css";

function IndexPage() {
	return (
		<div>
			<div className={styles.container}>
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
