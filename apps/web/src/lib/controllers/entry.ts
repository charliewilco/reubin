import { prisma } from "$/lib/db";
import type { EntryFilter } from "$/lib/filters";
import type { Prisma } from "@prisma/client";
import type { RSSItem } from "@xmlxyz/rsskit";

export type Entry = {
	id: string;
	link: string;
	title: string;
	content: string;
	pubDate: Date;
	favorite: boolean;
	unread: boolean;
	feedId: string | null;
	readAt: Date | null;
	summary: string | null;
};

type LeanEntry = Pick<Entry, "content" | "title" | "feedId" | "pubDate" | "link">;

export function fromRSS(rssItem: RSSItem, feedId: string): LeanEntry {
	return {
		title: rssItem.title ?? "Untitled Entry",
		content: rssItem.content ?? "",
		// biome-ignore lint/style/noNonNullAssertion: It's hard to guarantee that the link will _not_ be present
		link: rssItem.link!,
		feedId,
		pubDate: new Date(rssItem.pubDate ?? Date.now()),
	};
}

export async function favorite(id: string): Promise<Entry> {
	const entry = await prisma.entry.update({
		where: {
			id,
		},
		data: {
			favorite: true,
		},
	});
	if (entry === null) {
		throw new Error("Entry not updated");
	}

	return entry;
}

export async function feedBelongsToUser(feedId: string, userId: string): Promise<boolean> {
	return (
		(await prisma.entry.count({
			where: {
				id: feedId,
				feed: {
					userId,
				},
			},
		})) !== 0
	);
}

export async function markAsRead(id: string): Promise<Entry> {
	const entry = await prisma.entry.update({
		where: {
			id,
		},
		data: {
			unread: false,
		},
	});
	if (entry === null) {
		throw new Error("Entry not updated");
	}

	return entry;
}

export async function markAsUnread(id: string): Promise<Entry> {
	const entry = await prisma.entry.update({
		where: {
			id,
		},
		data: {
			unread: true,
		},
	});
	if (entry === null) {
		throw new Error("Entry not updated");
	}

	return entry;
}

export async function getById(id: string): Promise<Entry> {
	const entry = await prisma.entry.findUnique({ where: { id } });

	if (!entry) {
		throw new Error("Entry not found");
	}

	return entry;
}

export async function getByFeed(feedId: string, filter?: EntryFilter): Promise<Entry[]> {
	let args: Prisma.EntryWhereInput = { feedId: feedId };

	if (filter === "favorite") {
		args.favorite = true;
	}

	if (filter === "unread") {
		args.unread = true;
	}

	const entries =
		(await prisma.entry.findMany({
			where: args,
		})) ?? [];

	return entries;
}
