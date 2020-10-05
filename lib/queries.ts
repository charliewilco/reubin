const fs = require("fs");
const path = require("path");
import { ApolloError } from "apollo-server-micro";
import qs from "query-string";
import sanitizeHtml from "sanitize-html";
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
  createEntryURL,
  createFeedUrl,
  createFeedWithEntriesUrl,
  STARRED_URL,
  FEEDBIN_API,
} from "./urls";

export const writeToMock = (name: string, content: any) => {
  const f = path.join(process.cwd(), "mock", name.concat(".json"));

  fs.writeFileSync(f, JSON.stringify(content, null, 2), "utf8");
};

const getTime = (d: string) => new Date(d).getTime();

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
      const entry = await entryRes.json();

      console.log(
        entry.content,
        "\n",
        sanitizeHtml(entry.content, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          allowedAttributes: {
            img: ["src", "alt"],
          },
        })
      );

      return { ...entry, content: sanitizeHtml(entry.content) };
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
};
