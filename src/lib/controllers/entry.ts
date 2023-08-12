import type { Entry } from "@prisma/client";
import type { RSSItem } from "@xmlxyz/rsskit";
import { EntryFilter } from "$/lib/filters";
import { Services } from "../services";

type LeanEntry = Pick<Entry, "content" | "title" | "feedId" | "pubDate" | "link">;

export class EntryController {
	static fromRSS(rssItem: RSSItem, feedId: string): LeanEntry {
		return {
			title: rssItem.title ?? "Untitled Entry",
			content: rssItem.content ?? "",
			link: rssItem.link!,
			feedId,
			pubDate: new Date(rssItem.pubDate ?? Date.now()),
		};
	}
	async favorite(id: string) {
		const entry = await Services.db.entry.update({
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
	async feedBelongsToUser(feedId: string, userId: string): Promise<boolean> {
		return (
			(await Services.db.entry.count({
				where: {
					id: feedId,
					feed: {
						userId,
					},
				},
			})) !== 0
		);
	}
	async markAsUnread(id: string): Promise<Entry> {
		const entry = await Services.db.entry.update({
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
	async markAsRead(id: string): Promise<Entry> {
		const entry = await Services.db.entry.update({
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

	async getById(id: string): Promise<Entry> {
		const entry = await Services.db.entry.findUnique({ where: { id } });

		if (!entry) {
			throw new Error("Entry not found");
		}

		return entry;
	}

	// async getFeedFromEntry(id: string): Promise<Feed> {}

	async getByFeed(feedId: string, filter?: EntryFilter): Promise<Entry[]> {
		let args: any = { feedId: feedId };

		if (filter === "favorite") {
			args.favorite = true;
		}

		if (filter === "unread") {
			args.unread = true;
		}

		const entries =
			(await Services.db.entry.findMany({
				where: args,
			})) ?? [];

		return entries;
	}
}
