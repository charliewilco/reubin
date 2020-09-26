const fs = require("fs");
const path = require("path");
import qs from "query-string";
import { ResolverContext, deriveHeader } from "./context";
import { IQueryResolvers } from "./types";
import {
  normalizeSubscriptions,
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
} from "./urls";

export const writeToMock = (name: string, content: any) => {
  const f = path.join(process.cwd(), "mock", name.concat(".json"));

  fs.writeFileSync(f, JSON.stringify(content, null, 2), "utf8");
};

export const Query: IQueryResolvers<ResolverContext> = {
  subscriptions: async (_, __, context) => {
    console.log("SUBSCRIPTIONS QUERY");
    const init = deriveHeader(context);
    const subscriptionsRes = await fetch(SUBSCRIPTIONS_URL, init);

    const subscriptions: IServiceSubscriptions[] = await subscriptionsRes.json();
    const taggingsRes = await fetch(TAGGINGS_URL, init);
    const taggings: IServiceTagging[] = await taggingsRes.json();

    const x = normalizeSubscriptions(subscriptions, taggings);

    return x;
  },

  unread: async (_, __, context) => {
    console.log("UNREAD QUERY");

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
    console.log("ENTRIES QUERY");
    const init = deriveHeader(context);
    const url = page
      ? qs.stringifyUrl({ url: ENTRIES_URL, query: { page: page.toString() } })
      : ENTRIES_URL;

    const entriesRes = await fetch(url, init);
    const entries = entriesRes.json();

    return entries;
  },
};
