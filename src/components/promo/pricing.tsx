import { PricingTier } from "./pricing-tier";
import { PricingTierData } from "$/lib/payments";

interface PricingProps {
	tiers: PricingTierData[];
}

export function PricingTable({ tiers }: PricingProps) {
	return (
		<section>
			<div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
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
