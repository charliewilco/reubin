import type { Metadata } from "next";
import { PricingTable } from "$/components/promo/pricing";
import { Services } from "$/lib/services";

export const metadata: Metadata = {
	title: "Pricing",
};

export default async function PricingPage() {
	let allProducts = await Services.payments.getAllProducts();

	let tiers = Services.payments.convertToPricingTiers(
		allProducts.products.data,
		allProducts.prices.flatMap((price) => price.data)
	);

	return (
		<div className="mx-auto mb-16 max-w-7xl space-y-16 p-2">
			<header className="pt-8">
				<h1 className="text-5xl font-bold tracking-tight">Pricing Plans</h1>
				<p className="mt-5 text-xl text-zinc-500">
					Start building for free, then add a site plan to go live. Account plans unlock
					additional features.
				</p>
			</header>

			<PricingTable tiers={tiers} />
		</div>
	);
}
