import type { PricingTierData } from "$/lib/payments";
import { cx } from "class-variance-authority";
import { Check } from "lucide-react";

interface PricingTierProps {
	tier: PricingTierData;
	selected?: boolean;
	featured?: boolean;
}

export function PricingTier(props: PricingTierProps) {
	let priceContainer = cx(
		"rounded p-4",
		props.selected ? "bg-sky-500 text-zinc-900" : "bg-zinc-100 text-zinc-800"
	);
	let button = cx(
		"block w-full rounded-md py-2 text-center text-sm font-semibold text-white ",
		props.selected
			? "bg-zinc-900 opacity-25"
			: "bg-gradient-to-tr from-sky-900 to-sky-400 hover:bg-zinc-900 shadow-md"
	);
	return (
		<div>
			<div>
				<div className={priceContainer}>
					<p className="mb-2">
						<span className="font-mono text-4xl font-bold tracking-tight">
							${props.tier.priceMonthly}
						</span>{" "}
						<span className="text-base font-medium opacity-50">/mo</span>
					</p>
					<h2 className="mb-4 text-lg font-medium leading-6">{props.tier.name}</h2>

					<a aria-disabled={props.selected} href={props.tier.href} className={button}>
						{props.selected ? "Your Current Plan" : "Upgrade"}
					</a>
				</div>
				<p className="mt-4 font-sans text-sm text-zinc-800 dark:text-zinc-400">
					{props.tier.description}
				</p>
			</div>
		</div>
	);
}
