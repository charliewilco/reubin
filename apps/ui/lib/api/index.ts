import Parser from "rss-parser";
import { FeedMetadata } from "./url-metadata";
import { RSS } from "./rss";

export type MissingProduct = "Inoreader" | "Feedly";

export type Product = "RSS" | "Instapaper" | "Feedbin";

export type { FeedAPIResponse } from "./url-metadata";

export class Reubin {
  public readonly parser = new Parser();
  public readonly rss: RSS;
  public readonly metadata: FeedMetadata;
  constructor() {
    this.rss = new RSS(this.parser);
    this.metadata = new FeedMetadata(this.parser);
  }

  public urlQueryToString(_: string | string[]): string {
    return Array.isArray(_) ? _.join("") : _;
  }
}

export const reubin = new Reubin();
