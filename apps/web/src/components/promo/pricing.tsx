import type { PricingTierData } from "$/lib/payments";
import { PricingTier } from "./pricing-tier";
import styles from "./pricing.module.css";

interface PricingProps {
	tiers: PricingTierData[];
}

export function PricingTable({ tiers }: PricingProps) {
	return (
		<section>
			<div className={styles.collection}>
				{tiers.map((tier) => (
					<PricingTier
						key={tier.name}
						tier={tier}
						selected={tier.name.includes("Essentials")}
					/>
				))}
			</div>
		</section>
	);
}
