import { RSSKit } from "@reubin/rss";
import { MutationResolvers, QueryResolvers, EntryFilter } from "./types";
import { getFeedFromDirectURL } from "./feeds";
import { Context } from "./context";
import { mapORMEntryToAPIEntry, mapRSStoEntry } from "./maps";

const query: QueryResolvers<Context> = {
  async feeds(_parent, _args, { prisma }) {
    const feeds = await prisma.feed.findMany();

    return feeds;
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

const rss = new RSSKit();

const mutation: MutationResolvers<Context> = {
  async addFeed(_parent, { url }, { prisma }) {
    try {
      const { data } = await getFeedFromDirectURL(url);
      const parsed = await rss.parse(data);
      const feed = await prisma.feed.create({
        data: {
          title: parsed.title ?? "Untitled Feed",
          link: parsed.link ?? url,
          feedURL: parsed.feedUrl ?? url,
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
};

export const resolver = {
  Query: query,
  Mutation: mutation,
};
