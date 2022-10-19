import { Feed } from "@prisma/client";
import axios from "axios";
import { EntryController } from "./entry";
import type { Feed as FeedType } from "../__generated__";
import type { Services } from "../services";

export class FeedController {
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

  async add(url: string, token: string) {
    const userId = this.services.token.getUserId(token);

    try {
      const { data } = await FeedController.getFeedFromDirectURL(url);
      const parsed = await this.services.rss.parse(data);
      const feed = await this.services.orm.feed.create({
        data: {
          title: parsed.title ?? "Untitled Feed",
          link: parsed.link ?? url,
          feedURL: parsed.feedUrl ?? url,
          lastFetched: new Date(Date.now()),
          userId,
        },
      });

      await this.services.orm.entry.createMany({
        data: parsed.items.map((value) => EntryController.fromRSS(value, feed.id)),
      });

      return feed;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getById(id: string, token: string) {
    const userId = this.services.token.getUserId(token);
    const feed = await this.services.orm.feed.findUnique({
      where: {
        id,
      },
    });

    if (feed === null || feed.userId !== userId) {
      throw new Error("Feed not found");
    }

    return feed;
  }

  async getAll(token: string) {
    const userId = this.services.token.getUserId(token);
    const feeds = await this.services.orm.feed.findMany({
      where: {
        userId,
      },
    });
    const converted = [];
    for (let index = 0; index < feeds.length; index++) {
      converted.push(FeedController.fromORM(feeds[index]));
    }

    return converted;
  }
}
