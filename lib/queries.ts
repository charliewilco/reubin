const fs = require("fs");
const path = require("path");
import { ApolloError } from "apollo-server-micro";
import qs from "query-string";
import { getTime } from "./html";
import { ResolverContext, deriveHeader } from "./context";
import { IItem, IQueryResolvers } from "./types";
import {
  normalizeSubscriptions,
  deriveFeedFromSubscription,
  IServiceTagging,
  IServiceSubscriptions,
} from "./normalize";
import {
  ENTRIES_URL,
  SUBSCRIPTIONS_URL,
  TAGGINGS_URL,
  UNREAD_URL,
  createFeedUrl,
  createFeedWithEntriesUrl,
  STARRED_URL,
  FEEDBIN_API,
} from "./urls";
import { API } from "./api/api";

const api = new API();

export const writeToMock = (name: string, content: any) => {
  const f = path.join(process.cwd(), "mock", name.concat(".json"));

  fs.writeFileSync(f, JSON.stringify(content, null, 2), "utf8");
};

export const Query: IQueryResolvers<ResolverContext> = {
  subscriptions: async (_, __, context) => {
    const init = deriveHeader(context);
    const subscriptionsRes = await fetch(SUBSCRIPTIONS_URL, init);

    const subscriptions: IServiceSubscriptions[] = await subscriptionsRes.json();
    const taggingsRes = await fetch(TAGGINGS_URL, init);
    const taggings: IServiceTagging[] = await taggingsRes.json();

    const x = normalizeSubscriptions(subscriptions, taggings);

    return x;
  },

  unread: async (_, __, context) => {
    const init = deriveHeader(context);
    const unreadItemRes = await fetch(UNREAD_URL, init);

    const unreadItems: number[] = await unreadItemRes.json();

    // const urls = createUrlsofUnreads(unreadItems);

    // const unread: IEntryUnread[][] = await Promise.all(
    //   urls.map((url) => fetch(url, init).then((res) => res.json()))
    // );

    return unreadItems;
  },

  entries: async (_, { page }, context) => {
    return api.feedbin.getFeedItems(
      { authorization: context.req.headers["authorization"]! },
      page
    );
  },

  entry: async (_, { id }, context) => {
    try {
      return api.feedbin.getFeedItem(
        {
          authorization: context.req.headers["authorization"]!,
        },
        id
      );
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  subscription: async (_, { id }, context) => {
    const init = deriveHeader(context);
    const feedDetailsRes = await fetch(createFeedUrl(id), init);
    const feed = await feedDetailsRes.json();

    const entriesRes = await fetch(createFeedWithEntriesUrl(id), init);

    const items: IItem[] = await entriesRes.json();

    return {
      feed: deriveFeedFromSubscription(feed),
      items: items.sort((a, b) => getTime(b.published) - getTime(a.published)),
    };
  },

  favorites: async (_, __, context) => {
    const init = deriveHeader(context);
    const starredRes = await fetch(STARRED_URL, init);
    const favoriteIds: number[] = await starredRes.json();
    return favoriteIds;
  },

  bookmarks: async (_, { ids }, context) => {
    const init = deriveHeader(context);
    let url = qs.stringifyUrl({ url: ENTRIES_URL, query: { ids: ids } } as any);

    if (!ids || ids === null) {
      const starredRes = await fetch(STARRED_URL, init);
      const favoriteIds: number[] = await starredRes.json();

      url = qs.stringifyUrl(
        { url: ENTRIES_URL, query: { ids: favoriteIds } } as any,
        {
          arrayFormat: "comma",
        }
      );

      const entriesRes = await fetch(url, init);
      const entries = await entriesRes.json();
      return entries;
    }

    const entriesRes = await fetch(url, init);
    const entries = await entriesRes.json();
    return entries;
  },

  feed: async (_, { id }, context) => {
    const init = deriveHeader(context);

    const subscription = await fetch(
      FEEDBIN_API.concat(`/subscriptions/${id}.json`),
      init
    ).then((res) => res.json());

    return deriveFeedFromSubscription(subscription);
  },

  async product(_, { service, url }) {
    const results = await api.rss.getFeedItems(url);
    return results;
  },
};
