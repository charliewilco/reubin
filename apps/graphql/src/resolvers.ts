import {
  type MutationResolvers,
  type QueryResolvers,
  type Resolvers,
  EntryFilter,
} from "./types";
import type { Context } from "./context";
import { mapORMEntryToAPIEntry, mapRSStoEntry } from "./structs";
import { getFeedFromDirectURL } from "./feeds";

const query: QueryResolvers<Context> = {
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

    const entries = items.map((value) => mapRSStoEntry(value, feed.id));
    await prisma.entry.createMany({
      data: entries,
    });

    await prisma.feed.update({
      where: {
        id,
      },
      data: {
        lastFetched: new Date(Date.now()),
      },
    });

    const _ = await prisma.entry.findMany({
      where: {
        feedId: id,
        pubDate: {
          gte: feed.lastFetched,
        },
      },
    });

    return _.map((value) => mapORMEntryToAPIEntry(value));
  },
};

export const resolver: Resolvers<Context> = {
  Query: query,
  Mutation: mutation,
};
