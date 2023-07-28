import { SubscriptionType } from "@prisma/client";

export class Subscriptions {
	// TODO: Replace with ENV variables
	static types: Record<SubscriptionType, string> = {
		[SubscriptionType.FREEMIUM]: "freemium",
		[SubscriptionType.UNLIMITED]: "unlimited",
		[SubscriptionType.AI]: "ai",
		[SubscriptionType.BETA]: "beta",
		[SubscriptionType.SERVICE]: "Does not exist",
	};

	static keys: Record<string, SubscriptionType> = Object.fromEntries(
		Object.entries(Subscriptions.types).map(([key, value]) => [value, key as SubscriptionType])
	);

	static getSubscriptionKey(subscription: SubscriptionType) {
		return Subscriptions.types[subscription];
	}

	static getSubscriptionType(key: string) {
		return Subscriptions.keys[key];
	}
}
