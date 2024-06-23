import { PricingTable } from "$/components/promo/pricing";
import { convertToPricingTiers, getAllProducts } from "$/lib/payments";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
	title: "Pricing",
};

export default async function PricingPage() {
	let allProducts = await getAllProducts();

	let tiers = convertToPricingTiers(
		allProducts.products.data,
		allProducts.prices.flatMap((price) => price.data),
	);

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>Pricing Plans</h1>
				<p className={styles.tagline}>
					Start building for free, then add a site plan to go live. Account plans unlock
					additional features.
				</p>
			</header>

			<PricingTable tiers={tiers} />
		</div>
	);
}
