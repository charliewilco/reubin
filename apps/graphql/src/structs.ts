import type { Entry } from "@prisma/client";
import type { RSSItem } from "@reubin/rss";
import type { Entry as EntryType } from "./types";

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
