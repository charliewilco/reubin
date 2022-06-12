import Parser from "rss-parser";
import cuid from "cuid";
import { FeedMetadata } from "../lib/api/url-metadata";
import type { Feed, MutationResolvers, QueryResolvers } from "./types";
import prisma from "./prisma";

const parser = new Parser();
const metafetcher = new FeedMetadata(parser);

const query: QueryResolvers = {};

const mutation: MutationResolvers = {
  async addFeed(_parent, { url }) {
    try {
      const feedFromDB = await prisma?.feed.findMany({
        where: {
          link: url,
        },
      });
      if (feedFromDB.length > 0) {
        return feedFromDB[0];
      } else {
        const _metadata = await metafetcher.resolve(url);

        const feed: Feed = {
          id: cuid(),
          title: _metadata.title ?? "Untitled Feed",
          link: _metadata.url ?? url,
        };

        return feed;
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};

export const resolver = {
  Query: query,
  Mutation: mutation,
};
