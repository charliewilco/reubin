import type { Entry } from "@prisma/client";
import type { RSSItem } from "$/lib/rss";
import { ORM } from "$/lib/orm";
import { EntryFilter } from "$/lib/filters";

export class EntryController {
	static fromRSS(
		rssItem: RSSItem,
		feedId: string
	): Pick<Entry, "content" | "title" | "feedId" | "pubDate"> {
		return {
			title: rssItem.title ?? "Untitled Entry",
			content: rssItem.content ?? "",
			feedId,
			pubDate: new Date(rssItem.pubDate ?? Date.now()),
		};
	}
	async favorite(id: string) {
		const entry = await ORM.entry.update({
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
       return await ORM.entry.count({
            where: {
                id: feedId,
                feed: {
                    userId
                }
            },
        }) !== 0;
    }
	async markAsUnread(id: string): Promise<Entry> {
		const entry = await ORM.entry.update({
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
		const entry = await ORM.entry.update({
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
		const entry = await ORM.entry.findUnique({ where: { id } });

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

		// console.log("args", args);

		const entries =
			(await ORM.entry.findMany({
				where: args,
			})) ?? [];

		return entries;
	}
}
