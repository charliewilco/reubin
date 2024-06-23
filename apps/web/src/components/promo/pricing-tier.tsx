import type { PricingTierData } from "$/lib/payments";
import styles from "./pricing-tier.module.css";

interface PricingTierProps {
	tier: PricingTierData;
	selected?: boolean;
	featured?: boolean;
}

export function PricingTier(props: PricingTierProps) {
	return (
		<div>
			<div className={styles.container} data-selected={props.selected}>
				<p>
					<span className={styles.price}>${props.tier.priceMonthly}</span>{" "}
					<span className={styles.priceDur}>/mo</span>
				</p>
				<h2 className={styles.title}>{props.tier.name}</h2>

				<a aria-disabled={props.selected} href={props.tier.href} className={styles.button}>
					{props.selected ? "Your Current Plan" : "Upgrade"}
				</a>
			</div>
			<p className={styles.description}>{props.tier.description}</p>
		</div>
	);
}
