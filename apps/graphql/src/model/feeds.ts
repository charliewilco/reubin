import { Feed } from "@prisma/client";
import axios from "axios";
import { EntryManager } from "./entry";
import type { Feed as FeedType } from "../__generated__";
import type { Services } from "../services";

export class FeedManager {
  static async getFeedFromDirectURL(url: string) {
    return axios.get<string>(url, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  static fromORM(feed: Feed): FeedType {
    return {
      ...feed,
      tag: feed.tagId,
    };
  }

  constructor(public services: Services) {}

  async add(url: string) {
    try {
      const { data } = await FeedManager.getFeedFromDirectURL(url);
      const parsed = await this.services.rss.parse(data);
      const feed = await this.services.orm.feed.create({
        data: {
          title: parsed.title ?? "Untitled Feed",
          link: parsed.link ?? url,
          feedURL: parsed.feedUrl ?? url,
          lastFetched: new Date(Date.now()),
        },
      });

      await this.services.orm.entry.createMany({
        data: parsed.items.map((value) => EntryManager.fromRSS(value, feed.id)),
      });

      return feed;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getAll() {
    const feeds = await this.services.orm.feed.findMany();
    const converted = [];
    for (let index = 0; index < feeds.length; index++) {
      converted.push(FeedManager.fromORM(feeds[index]));
    }

    return converted;
  }
}
