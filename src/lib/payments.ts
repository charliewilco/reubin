import { Stripe } from "stripe";
import { Env } from "./env";
import type { AuthUser } from "@prisma/client";

export interface PricingTierData {
	name: string;
	href: string;
	id: string;
	includedFeatures: string[];
	priceMonthly: number;
	description: string | null;
}

let FREE_TIER: PricingTierData = {
	name: "Essentials Plan",
	id: "FREE_PLAN",
	description:
		"Dive into the world of RSS with our Essential Stream plan. Stay updated with up to 10 feeds without any limitations.",
	href: "/pricing/essentials",
	includedFeatures: [],
	priceMonthly: 0,
};

export class Payments {
	stripe: Stripe;
	constructor() {
		this.stripe = new Stripe(Env.$vars.STRIPE_SECRET_KEY, {
			apiVersion: "2023-10-16",
			typescript: true,
		});
	}

	async createCustomer(user: AuthUser) {
		this.stripe.customers.create({
			email: user.email,
		});
	}

	private getPriceIds(products: Stripe.Product[]): Stripe.ApiListPromise<Stripe.Price>[] {
		let requests = [];
		for (let product of products) {
			requests.push(this.stripe.prices.list({ product: product.id }));
		}

		return requests;
	}

	convertToPricingTiers(
		products: Stripe.Product[],
		prices: Stripe.Price[],
	): PricingTierData[] {
		let tiers: PricingTierData[] = [FREE_TIER];
		for (let product of products) {
			let price = prices.find((price) => price.product === product.id);
			if (!price) {
				throw new Error(`No price found for product ${product.id}`);
			}
			let amount = price.unit_amount ?? 0;
			tiers.push({
				name: product.name,
				id: product.id,
				href: product.metadata.href,
				includedFeatures: [],
				priceMonthly: amount / 100,
				description: product.description,
			});
		}
		return tiers.sort((a, b) => a.priceMonthly - b.priceMonthly);
	}

	async getAllProducts() {
		let products = await this.stripe.products.list();
		let prices = await Promise.all(this.getPriceIds(products.data));

		return { products, prices };
	}
}
