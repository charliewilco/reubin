import { prisma } from "$/lib/db";
import type { Feed } from "@prisma/client";
import { RSSKit } from "@xmlxyz/rsskit";
import { fromRSS } from "./entry";

const rss = new RSSKit();

export async function getFeedFromDirectURL(url: string) {
	return fetch(url, {
		headers: {
			"Content-Type": "text/plain",
		},
	}).then((res) => res.text());
}

export function fromORM(feed: Feed) {
	return {
		...feed,
		tag: feed.tagId,
	};
}

export async function add(url: string, userId: string) {
	try {
		const data = await getFeedFromDirectURL(url);
		const parsed = await rss.parse(data);
		const feed = await prisma.feed.create({
			data: {
				title: parsed.title ?? "Untitled Feed",
				link: parsed.link ?? url,
				feedURL: parsed.feedUrl ?? url,
				lastFetched: new Date(Date.now()),
				userId,
			},
		});

		let created = parsed.items?.map((value) => fromRSS(value, feed.id)) ?? [];
		if (created.length > 0)
			await prisma.entry.createMany({
				data: created,
			});

		return feed;
	} catch (error: unknown) {
		throw new Error(String(error));
	}
}

export async function getById(id: string, userId?: string) {
	const feed = await prisma.feed.findUnique({
		where: {
			id,
		},
	});

	if (feed === null || feed.userId !== userId) {
		throw new Error("Feed not found");
	}

	return feed;
}

export async function getByTagID(id: string, userId: string) {
	const feeds = await prisma.feed.findMany({
		where: {
			userId,
			tagId: id,
		},
	});

	const converted = [];
	for (let index = 0; index < feeds.length; index++) {
		converted.push(fromORM(feeds[index]));
	}

	return converted;
}

export async function getAll(userId?: string) {
	const feeds = await prisma.feed.findMany({
		where: {
			userId,
		},
	});
	const converted = [];
	for (let index = 0; index < feeds.length; index++) {
		converted.push(fromORM(feeds[index]));
	}

	return converted;
}

export async function updateTitle(id: string, title: string, userId: string) {
	let feed = await prisma.feed.update({
		where: {
			feedUserId: {
				id,
				userId: userId,
			},
		},
		data: {
			title: title,
		},
	});

	return feed;
}

export async function remove(id: string, userId: string) {
	const feed = await prisma.feed.findUnique({
		where: {
			id,
		},
	});

	if (feed === null || feed.userId !== userId) {
		throw new Error("Feed not found");
	}

	const removed = await prisma.feed.delete({
		where: {
			id,
		},
	});

	return removed;
}

export async function refresh(id: string) {
	const feed = await prisma.feed.findUnique({
		where: {
			id,
		},
	});

	if (feed === null) {
		throw new Error("Couldn't find feed");
	}

	const rssText = await getFeedFromDirectURL(feed.feedURL);
	const { items } = await rss.parse(rssText);

	const lastFetchedISO = feed.lastFetched.toISOString();

	const entries: ReturnType<typeof fromRSS>[] = [];

	for (const item of items) {
		if (item) {
			// biome-ignore lint/style/noNonNullAssertion: we need to check if there's an isoDate
			if (lastFetchedISO < item.isoDate!) {
				entries.push(fromRSS(item, feed.id));
			}
		}
	}

	await prisma.entry.createMany({
		data: entries,
	});

	const _ = await prisma.entry.findMany({
		where: {
			feedId: id,
			pubDate: {
				gte: feed.lastFetched,
			},
		},
	});

	await prisma.feed.update({
		where: {
			id,
		},
		data: {
			lastFetched: new Date(Date.now()),
		},
	});

	return _;
}

export async function attachTag(feedId: string, tagId: string, userId: string) {
	const feed = await prisma.feed.updateMany({
		where: {
			id: feedId,
			userId,
		},
		data: {
			tagId,
		},
	});

	return feed;
}

export async function markAllAsRead(feedId: string, _userId: string) {
	await prisma.entry.updateMany({
		where: {
			feedId,
		},
		data: {
			unread: false,
		},
	});
}
