import Parser from "rss-parser";
import { IFeed, IItem, IFeedService, IHandlerOptions } from "./types";

export const DUMMY_SUBSCRIPTIONS = [
  "https://daverupert.com/atom.xml",
  "https://charliewil.co/rss.xml",
  "https://typescript.wtf/rss.xml",
];

interface IParserItem {
  link: string;
  guid: string;
  title: string;
  pubDate: string;
  creator: string;
  content: string;
  isoDate: string;
  categories: string[];
  summary: string | null;
  contentSnippet: string | null;
  enclosureUrl: string | null;
  enclosureLength: number | null;
  enclosureType: string | null;
}

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
      return items.length === 0
        ? []
        : items.map(({ content, contentSnippet, ..._f }) => {
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

  private _createMergeFactory(url: string) {
    return ({
      content,
      link,
      creator,
      title,
      guid,
      categories,
      pubDate,
      isoDate,
      enclosure,
      ...item
    }: Parser.Item): IParserItem => {
      const _item: IParserItem = {
        ...item,
        content: content ?? "Content not found",
        creator: creator ?? "No Creator",
        link: link ?? url,
        title: title ?? "No Title",
        guid: guid ?? link ?? "No guid available",
        categories: categories ?? [],
        pubDate: pubDate ?? "Invalid date",
        isoDate: isoDate ?? "Invalid date",
        summary: item.summary ?? null,
        contentSnippet: item.contentSnippet ?? null,
        enclosureLength: enclosure?.length ?? null,
        enclosureUrl: enclosure?.url ?? null,
        enclosureType: enclosure?.type ?? null,
      };

      return _item;
    };
  }

  public async getMagicFeedItems(url: string) {
    const { items } = await this.parseURL(url);

    return items.map(this._createMergeFactory(url));
  }

  public async getMagicDetails(url: string) {
    const { items, ...feed } = await this.parseURL(url);

    return {
      items: items.map(this._createMergeFactory(url)),
      ...feed,
    };
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
