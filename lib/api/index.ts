import { FeedbinAPI } from "./feedbin";
import { InstapaperAPI } from "./instapaper";
import { RSS } from "./rss";
import { IFeedService, HTMLParseHandler } from "./types";

export type MissingProduct = "Inoreader" | "Feedly";

export type Product = "RSS" | "Instapaper" | "Feedbin";

interface IServices {
  rss: RSS;
  instapaper: InstapaperAPI;
  feedbin: FeedbinAPI;
  getService(product: Product): IFeedService;
}

const DEFAULT_HTML_PARSER: HTMLParseHandler = (_) => _;

export class API implements IServices {
  public readonly rss: RSS;
  public readonly instapaper: InstapaperAPI;
  public readonly feedbin: FeedbinAPI;
  constructor(parser: HTMLParseHandler = DEFAULT_HTML_PARSER) {
    this.rss = new RSS();
    this.feedbin = new FeedbinAPI(parser);
    this.instapaper = new InstapaperAPI();
  }

  public getService(product: Product) {
    switch (product) {
      case "RSS":
        return this.rss;
      case "Feedbin":
        return this.feedbin;

      case "Instapaper":
        return this.instapaper;

      default:
        throw new Error("Must provide product name");
    }
  }
}
