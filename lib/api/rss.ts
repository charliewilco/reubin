import Parser from "rss-parser";
import { IFeed, IItem } from "../types";
import { IFeedService } from "./types";

export class RSS extends Parser implements IFeedService {
  constructor() {
    super();
  }
  async getFeedItems(url: string): Promise<IItem[]> {
    const { items, ...feed } = await this.parseURL(url);
    console.log(feed);
    return items.map(({ content, contentSnippet, ..._f }) => {
      console.log(_f);
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

  async getItemsFromLastUpdate(lastUpdate: Date, urls: string[]) {}

  async getFeedDetails(url: string): Promise<IFeed> {
    return {
      url,
      site: "...",
      name: "...",
      id: "...",
      feed_id: 1,
    };
  }
}
