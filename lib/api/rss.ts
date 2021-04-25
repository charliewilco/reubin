import Parser from "rss-parser";
import { IFeed, IItem, IFeedService, IHandlerOptions } from "./types";

export const DUMMY_SUBSCRIPTIONS = [
  "https://daverupert.com/atom.xml",
  "https://charliewil.co/rss.xml",
  "https://typescript.wtf/rss.xml",
];

export class RSS extends Parser implements IFeedService {
  constructor() {
    super();
  }
  public unread = new Set<string>();
  public favorites = new Set<string>();
  async getFeedItems(url: IHandlerOptions | string): Promise<IItem[]> {
    if (typeof url === "string") {
      const { items, ...feed } = await this.parseURL(url);
      console.log(feed);
      return items.map(({ content, contentSnippet, ..._f }) => {
        return {
          id: _f.guid!,
          created_at: _f.isoDate!,
          title: _f.title ?? "...",
          content: content!,
          feed_id: 2,
          author: _f.author ?? _f.creator ?? "No Creator",
          summary: _f.contentSnippet ?? null,
          url: _f.link!,
          published: _f.pubDate!,
          extracted_content_url: _f.enclosure?.url ?? "...",
        };
      });
    }

    throw new Error("Must be url");
  }

  async getAllFeeds(): Promise<IFeed[]> {
    return [];
  }

  async getFeedDetails(url: string): Promise<IFeed> {
    const {} = await this.parseURL(url);
    return {
      url,
      site: "...",
      name: "...",
      id: "...",
      feed_id: 1,
    };
  }
}
