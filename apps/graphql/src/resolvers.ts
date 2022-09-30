import {
  type MutationResolvers,
  type QueryResolvers,
  type Resolvers,
  EntryFilter,
} from "./types";
import type { Context } from "./context";
import { mapFeedtoAPIFeed, mapORMEntryToAPIEntry, mapRSStoEntry } from "./structs";
import { getFeedFromDirectURL } from "./feeds";

// TODO: Create tag object
// TODO: User sign up, registration
// TODO: Stripe integration

/**
 * TODO:
 * - recently read
 * - tags
 * - me
 **/
const query: QueryResolvers<Context> = {
  async tags(_, __, { prisma }) {
    const tags = await prisma.tag.findMany();

    return tags.map((tag) => ({ id: tag.id, title: tag.title }));
  },
  async feeds(_parent, _args, { prisma }) {
    const feeds = await prisma.feed.findMany();

    return feeds;
  },
  async feed(_parent, { id }, { prisma }) {
    const feed = await prisma.feed.findUnique({
      where: {
        id,
      },
    });

    if (feed === null) {
      throw new Error("Feed not found");
    }

    return feed;
  },
  async entry(_parent, { id }, { prisma }) {
    const entry = await prisma.entry.findUnique({
      where: {
        id,
      },
    });

    if (entry === null) {
      throw new Error("Entry not found.");
    }

    return mapORMEntryToAPIEntry(entry);
  },
  async entries(_parent, { feed_id, filter }, { prisma }) {
    let args: any = { feedId: feed_id };

    if (filter === EntryFilter.Favorited) {
      args.favorite = true;
    }

    if (filter === EntryFilter.Unread) {
      args.unread = true;
    }

    const entries = await prisma.entry.findMany({
      where: args,
    });

    return entries.map((value) => mapORMEntryToAPIEntry(value));
  },
};

/**
 * TODO:
 * - create, read, update, delete tags
 * - login
 * - register user
 **/
const mutation: MutationResolvers<Context> = {
  async addFeed(_parent, { url }, { prisma, rss }) {
    try {
      const { data } = await getFeedFromDirectURL(url);
      const parsed = await rss.parse(data);
      const feed = await prisma.feed.create({
        data: {
          title: parsed.title ?? "Untitled Feed",
          link: parsed.link ?? url,
          feedURL: parsed.feedUrl ?? url,
          lastFetched: new Date(Date.now()),
        },
      });

      await prisma.entry.createMany({
        data: parsed.items.map((value) => mapRSStoEntry(value, feed.id)),
      });

      return feed;
    } catch (err: any) {
      throw new Error(err);
    }
  },
  async removeFeed(_parent, { id }, { prisma }) {
    await prisma.entry.deleteMany({
      where: {
        feedId: id,
      },
    });
    const feed = await prisma.feed.delete({
      where: {
        id,
      },
    });
    return feed;
  },
  async refreshFeed(_parent, { id }, { prisma, rss }) {
    const feed = await prisma.feed.findUnique({
      where: {
        id,
      },
    });

    if (feed === null) {
      throw new Error("Couldn't find feed");
    }

    const { data: rssText } = await getFeedFromDirectURL(feed.feedURL);
    const { items } = await rss.parse(rssText);

    const lastFetchedISO = feed.lastFetched.toISOString();

    const entries: ReturnType<typeof mapRSStoEntry>[] = [];

    for (const item of items) {
      if (item) {
        if (lastFetchedISO < item.isoDate!) {
          entries.push(mapRSStoEntry(item, feed.id));
        }
      }
    }

    console.log(entries.length, items.length);

    await prisma.entry.createMany({
      data: entries,
    });

    const _ = await prisma.entry.findMany({
      where: {
        feedId: id,
        pubDate: {
          gte: feed.lastFetched,
        },
      },
    });

    await prisma.feed.update({
      where: {
        id,
      },
      data: {
        lastFetched: new Date(Date.now()),
      },
    });

    return _.map((value) => mapORMEntryToAPIEntry(value));
  },
  async markAsRead(_parent, { id }, { prisma }) {
    const entry = await prisma.entry.update({
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

    return mapORMEntryToAPIEntry(entry);
  },

  async markAsFavorite(_parent, { id, favorite }, { prisma }) {
    const entry = await prisma.entry.update({
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

    return mapORMEntryToAPIEntry(entry);
  },
  async updateFeed(_parent, { id, title }, { prisma }) {
    try {
      const feed = await prisma.feed.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });

      if (feed === null) {
        throw new Error("Feed not updated");
      }

      return mapFeedtoAPIFeed(feed);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async addTag(_parent, { name }, { prisma }) {
    try {
      const tag = await prisma.tag.create({
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
};

export const resolvers: Resolvers<Context> = {
  Query: query,
  Mutation: mutation,
};
