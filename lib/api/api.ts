// import { parse, fetchResource } from "@postlight/mercury-parser";
import { FeedbinAPI } from "./feedbin";
import { InstapaperAPI } from "./instapaper";
import { RSS } from "./rss";
import { IFeedService } from "./types";

export type MissingProduct = "Inoreader" | "Feedly";

export type Product = "RSS" | "Instapaper" | "Feedbin";

interface IServices {
  rss: RSS;
  instapaper: InstapaperAPI;
  feedbin: FeedbinAPI;
  getService(product: Product): IFeedService;
}

export class API implements IServices {
  public rss = new RSS();
  public feedbin = new FeedbinAPI();
  public instapaper = new InstapaperAPI();

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
