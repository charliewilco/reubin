import { CachedAPI } from "./cached-service";
import { IFeedService } from "./types";

export class InstapaperAPI extends CachedAPI implements IFeedService {
  constructor() {
    super("https://www.instapaper.com/api/");
  }

  favorites = new Set<string>();
  unread = new Set<string>();

  async getAllFeeds() {
    return [];
  }

  async getFeedItems() {
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
}
