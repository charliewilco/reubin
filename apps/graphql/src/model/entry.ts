import type { Entry } from "@prisma/client";
import type { Services } from "../services";
import type { RSSItem } from "@reubin/rsskit";
import type { Entry as EntryType } from "../__generated__";

export class EntryController {
	static fromORM(entry: Entry): EntryType {
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
	constructor(public services: Services) {}

	getAll() {}
}
