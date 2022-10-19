import { Feed } from "@prisma/client";

import {
  type MutationResolvers,
  type QueryResolvers,
  type Resolvers,
  EntryFilter,
} from "./__generated__";
import type { Context } from "./context";
import { FeedManager } from "./model/feeds";
import { EntryManager } from "./model/entry";
import { Models } from "./model";
import { services } from "./services";

// TODO: Create tag object
// TODO: User sign up, registration
// TODO: Stripe integration

const m = new Models();

/**
 * TODO:
 * - recently read
 * - me
 **/
const query: QueryResolvers<Context> = {
  async tags(_, __, { token }) {
    const tags = await services.orm.tag.findMany();

    return tags.map((tag) => ({ id: tag.id, title: tag.title }));
  },
  async feeds(_parent, _args, {}) {
    const feeds = await services.orm.feed.findMany();

    return feeds.map((f) => FeedManager.fromORM(f));
  },
  async feed(_parent, { id }, {}) {
    const feed = await services.orm.feed.findUnique({
      where: {
        id,
      },
    });

    if (feed === null) {
      throw new Error("Feed not found");
    }

    return feed;
  },
  async entry(_parent, { id }, {}) {
    const entry = await services.orm.entry.findUnique({
      where: {
        id,
      },
    });

    if (entry === null) {
      throw new Error("Entry not found.");
    }

    return EntryManager.fromORM(entry);
  },
  async entries(_parent, { feed_id, filter }, {}) {
    let args: any = { feedId: feed_id };

    if (filter === EntryFilter.Favorited) {
      args.favorite = true;
    }

    if (filter === EntryFilter.Unread) {
      args.unread = true;
    }

    const entries = await services.orm.entry.findMany({
      where: args,
    });

    return entries.map((value) => EntryManager.fromORM(value));
  },
};

/**
 * TODO:
 * - login
 * - register user
 **/
const mutation: MutationResolvers<Context> = {
  async addFeed(_parent, { url }, {}) {
    try {
      const { data } = await FeedManager.getFeedFromDirectURL(url);
      const parsed = await services.rss.parse(data);
      const feed = await services.orm.feed.create({
        data: {
          title: parsed.title ?? "Untitled Feed",
          link: parsed.link ?? url,
          feedURL: parsed.feedUrl ?? url,
          lastFetched: new Date(Date.now()),
        },
      });

      await services.orm.entry.createMany({
        data: parsed.items.map((value) => EntryManager.fromRSS(value, feed.id)),
      });

      return feed;
    } catch (err: any) {
      throw new Error(err);
    }
  },
  async addTag(_parent, { name }, {}) {
    try {
      const tag = await services.orm.tag.create({
        data: {
          title: name,
        },
      });

      return {
        id: tag.id,
        title: tag.title,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async removeFeed(_parent, { id }, {}) {
    await services.orm.entry.deleteMany({
      where: {
        feedId: id,
      },
    });
    const feed = await services.orm.feed.delete({
      where: {
        id,
      },
    });
    return feed;
  },
  async removeTag(_parent, { id }, {}) {
    const tag = await services.orm.tag.delete({
      where: {
        id,
      },
    });

    return {
      id: tag.id,
      title: tag.title,
    };
  },
  async refreshFeed(_parent, { id }, {}) {
    const feed = await services.orm.feed.findUnique({
      where: {
        id,
      },
    });

    if (feed === null) {
      throw new Error("Couldn't find feed");
    }

    const { data: rssText } = await FeedManager.getFeedFromDirectURL(feed.feedURL);
    const { items } = await services.rss.parse(rssText);

    const lastFetchedISO = feed.lastFetched.toISOString();

    const entries: ReturnType<typeof EntryManager.fromRSS>[] = [];

    for (const item of items) {
      if (item) {
        if (lastFetchedISO < item.isoDate!) {
          entries.push(EntryManager.fromRSS(item, feed.id));
        }
      }
    }

    await services.orm.entry.createMany({
      data: entries,
    });

    const _ = await services.orm.entry.findMany({
      where: {
        feedId: id,
        pubDate: {
          gte: feed.lastFetched,
        },
      },
    });

    await services.orm.feed.update({
      where: {
        id,
      },
      data: {
        lastFetched: new Date(Date.now()),
      },
    });

    return _.map((value) => EntryManager.fromORM(value));
  },
  async markAsRead(_parent, { id }, {}) {
    const entry = await services.orm.entry.update({
      where: {
        id,
      },
      data: {
        unread: false,
      },
    });
    if (entry === null) {
      throw new Error("Entry not updated");
    }

    return EntryManager.fromORM(entry);
  },
  async markAsFavorite(_parent, { id, favorite }, {}) {
    const entry = await services.orm.entry.update({
      where: {
        id,
      },
      data: {
        favorite,
      },
    });
    if (entry === null) {
      throw new Error("Entry not updated");
    }

    return EntryManager.fromORM(entry);
  },
  async updateFeed(_parent, { id, fields }, {}) {
    try {
      const data: Partial<Feed> = {};

      if (fields?.title) {
        data.title = fields.title;
      }

      if (fields?.tagID) {
        data.tagId = fields.tagID;
      }

      const feed = await services.orm.feed.update({
        where: {
          id,
        },
        data,
      });

      if (feed === null) {
        throw new Error("Feed not updated");
      }

      return FeedManager.fromORM(feed);
    } catch (error: any) {
      throw new Error(error);
    }
  },
  async createUser(_, { email, password }, context) {
    return m.users.create(email, password);
  },
  async login(_, { email, password }, context) {
    return m.users.verify(email, password);
  },
};

export const resolvers: Resolvers<Context> = {
  Query: query,
  Mutation: mutation,
};
