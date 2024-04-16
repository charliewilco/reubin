import { FeatureList } from '$/components/promo/features'
import { SocialServices } from '$/components/promo/social-services'
import { Hero } from '$/components/promo/hero'
import { CallToAction } from '$/components/promo/call-to-action'
import { SiteFooter } from '$/components/site-footer'
import styles from './home.module.css'

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
	)
}

export default IndexPage
