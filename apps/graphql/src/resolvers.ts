import { RSSKit } from "@reubin/rss";
import type { MutationResolvers, QueryResolvers } from "./types";
import { getFeedFromDirectURL } from "./feeds";
import { Context } from "./context";

const query: QueryResolvers<Context> = {
  async feeds(_parent, _args, { prisma }) {
    const feeds = await prisma.feed.findMany();

    return feeds;
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
