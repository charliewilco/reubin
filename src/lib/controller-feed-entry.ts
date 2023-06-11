import type { Entry } from "@prisma/client";
import { RSSItem } from "./unstable-rss";

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

	getAll() {}
}
