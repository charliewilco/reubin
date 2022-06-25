import cuid from "cuid";
import type { Feed, MutationResolvers, QueryResolvers } from "./types";

const query: QueryResolvers = {};

const mutation: MutationResolvers = {
  async addFeed(_parent, { url }) {
    try {
      const _metadata = {
        title: "Something",
        url: "https://something.example/",
      };

      const feed: Feed = {
        id: cuid(),
        title: _metadata.title ?? "Untitled Feed",
        link: _metadata.url ?? url,
      };

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
