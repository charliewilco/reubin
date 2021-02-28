import Parser from "rss-parser";
import { IItem } from "../types";

export class RSS extends Parser {
  constructor() {
    super();
  }
  async getItems(url: string): Promise<IItem[]> {
    const feed = await this.parseURL(url);
    console.log(feed);
    return feed.items.map((_f) => {
      return {
        id: 1,
        created_at: _f.isoDate!,
        title: _f.title ?? "...",
        content: _f.content!,
        feed_id: 2,
        author: _f.creator ?? "No Creator",
        summary: _f.contentSnippet ?? null,
        url: _f.link!,
        published: _f.pubDate!,
        extracted_content_url: _f.enclosure?.url ?? "...",
      };
    });
  }

  async getItemsFromLastUpdate(lastUpdate: Date, urls: string[]) {}

  async getFeedInfo(url: string): Promise<any> {}
}
