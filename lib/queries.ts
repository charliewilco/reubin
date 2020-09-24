const fs = require("fs");
const path = require("path");
import { ResolverContext, deriveHeader } from "./context";
import { IQueryResolvers } from "./types";
import {
  normalizeSubscriptions,
  IServiceTagging,
  IServiceSubscriptions,
  createUrlsofUnreads,
  IEntryUnread,
} from "./normalize";
import { SUBSCRIPTIONS_URL, TAGGINGS_URL, UNREAD_URL } from "./urls";

export const writeToMock = (name: string, content: any) => {
  const f = path.join(process.cwd(), "mock", name.concat(".json"));

  fs.writeFileSync(f, JSON.stringify(content, null, 2), "utf8");
};

export const Query: IQueryResolvers<ResolverContext> = {
  subscription: async (_, __, context) => {
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

    const urls = createUrlsofUnreads(unreadItems);

    const unread: IEntryUnread[][] = await Promise.all(
      urls.map((url) => fetch(url, init).then((res) => res.json()))
    );

    return unread.flat();
  },
};
