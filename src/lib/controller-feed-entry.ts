import type { Entry, Feed } from "@prisma/client";
import { RSSItem } from "./rss";
import { ORM } from "$/lib/orm";
import { EntryFilter } from "$/lib/filters";

export class EntryController {
	static fromORM(entry: any) {
		return {
			title: entry.title,
			id: entry.id,
			content: entry.content,
			feed_id: entry.feedId!,
			published: entry.pubDate,
			unread: entry.unread,
			favorite: entry.favorite,
		};
	}
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

	async getFeedFromEntry(id: string): Promise<Feed> {}

	async getByFeed(feedId: string, filter: EntryFilter): Promise<Entry[]> {
		let args: any = { feedId: feedId };

		if (filter === EntryFilter.Favorited) {
			args.favorite = true;
		}

		if (filter === EntryFilter.Unread) {
			args.unread = true;
		}

		const entries =
			(await ORM.entry.findMany({
				where: args,
			})) ?? [];

		return entries;
	}
}
