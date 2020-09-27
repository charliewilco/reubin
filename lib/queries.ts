const fs = require("fs");
const path = require("path");
import { ApolloError } from "apollo-server-micro";
import qs from "query-string";
import { ResolverContext, deriveHeader } from "./context";
import { IQueryResolvers } from "./types";
import {
  normalizeSubscriptions,
  deriveFeedFromSubscription,
  IServiceTagging,
  IServiceSubscriptions,
  // createUrlsofUnreads,
  // IEntryUnread,
} from "./normalize";
import {
  ENTRIES_URL,
  SUBSCRIPTIONS_URL,
  TAGGINGS_URL,
  UNREAD_URL,
  createEntryURL,
  createFeedUrl,
  createFeedWithEntriesUrl,
} from "./urls";

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

    return {
      itemIDs: unreadItems.toString().split(","),
    };
  },

  entries: async (_, { page }, context) => {
    const init = deriveHeader(context);
    const url = page
      ? qs.stringifyUrl({ url: ENTRIES_URL, query: { page: page.toString() } })
      : ENTRIES_URL;

    const entriesRes = await fetch(url, init);
    const entries = entriesRes.json();

    return entries;
  },

  entry: async (_, { id }, context) => {
    const init = deriveHeader(context);
    const url = createEntryURL(id);

    try {
      const entryRes = await fetch(url, init);
      const entry = entryRes.json();

      return entry;
    } catch (error) {
      throw new ApolloError(error);
    }
  },

  subscription: async (_, { id }, context) => {
    const init = deriveHeader(context);
    console.log(createFeedUrl(id), createFeedWithEntriesUrl(id));
    const feedDetailsRes = await fetch(createFeedUrl(id), init);
    const feed = await feedDetailsRes.json();

    const entriesRes = await fetch(createFeedWithEntriesUrl(id), init);

    const items = await entriesRes.json();

    return {
      feed: deriveFeedFromSubscription(feed),
      items,
    };
  },
};
