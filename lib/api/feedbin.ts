import { getContent } from "../html";
import { IItem } from "../types";
import { FEEDBIN_API } from "../urls";
import { CachedAPI } from "./cached-service";
import { IFeedService, IHandlerOptions } from "./types";

export class FeedbinAPI extends CachedAPI implements IFeedService {
  constructor() {
    super(FEEDBIN_API);
  }
  favorites = new Set<string>();
  unread = new Set<string>();
  async getAuthorization(): Promise<string> {
    return "...";
  }

  async getFeedItems(
    options: IHandlerOptions | string,
    page?: number | null
  ): Promise<IItem[]> {
    if (typeof options === "string") {
      throw new Error("Must specify auth");
    }
    this.instance.mergeOptions({
      headers: {
        Authorization: options.authorization,
      },
    });

    const params = page ? { page: page.toString() } : {};

    const entries = await this.get<IItem[]>("entries.json", params);

    return entries;
  }

  async getAllFeeds() {
    return [];
  }

  async getFeedDetails() {
    return {
      url: "...",
      site: "...",
      name: "...",
      id: "",
      feed_id: 4,
    };
  }
  async getFeedItem(options: IHandlerOptions, id: number) {
    this.instance.mergeOptions({
      headers: { Authorization: options.authorization },
    });

    const entry = await this.get<IItem>(`/entries/${id}.json`);

    return {
      ...entry,
      content: getContent(entry.content),
    };
  }
}
