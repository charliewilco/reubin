import type { Entry, Feed } from "@prisma/client";
import type { RSSItem } from "./rss";
import type { Entry as EntryType, Feed as FeedType } from "./types";

export const mapFeedtoAPIFeed = (feed: Feed): FeedType => {
	return {
		...feed,
	};
};

export const mapRSStoEntry = (
	rssItem: RSSItem,
	feedId: string
): Pick<Entry, "content" | "title" | "feedId" | "pubDate"> => {
	return {
		title: rssItem.title ?? "Untitled Entry",
		content: rssItem.content ?? "",
		feedId,
		pubDate: new Date(rssItem.pubDate ?? Date.now()),
	};
};

export const mapORMEntryToAPIEntry = (entry: Entry): EntryType => {
	return {
		title: entry.title,
		id: entry.id,
		content: entry.content,
		feed_id: entry.feedId!,
		published: entry.pubDate,
		unread: entry.unread,
		favorite: entry.favorite,
	};
};
