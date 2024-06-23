import { SubscriptionType } from "@prisma/client";

const types: Record<SubscriptionType, string> = {
	[SubscriptionType.FREEMIUM]: "freemium",
	[SubscriptionType.UNLIMITED]: "unlimited",
	[SubscriptionType.AI]: "ai",
	[SubscriptionType.BETA]: "beta",
	[SubscriptionType.SERVICE]: "Does not exist",
};

const keys = Object.fromEntries(
	Object.entries(types).map(([key, value]) => [value, key as SubscriptionType]),
);

export function getSubscriptionKey(subscription: SubscriptionType) {
	return types[subscription];
}

export function getSubscriptionType(key: string) {
	return keys[key];
}
