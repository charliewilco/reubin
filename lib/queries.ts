const fs = require("fs");
const path = require("path");
import { ResolverContext } from "./context";
import { IQueryResolvers } from "./types";
import {
  normalizeSubscriptions,
  IServiceTagging,
  IServiceSubscriptions,
} from "./normalize";
import { SUBSCRIPTIONS_URL, TAGGINGS_URL } from "./urls";

export const writeToMock = (name: string, content: any) => {
  const f = path.join(process.cwd(), "mock", name.concat(".json"));

  fs.writeFileSync(f, JSON.stringify(content, null, 2), "utf8");
};

export const Query: IQueryResolvers<ResolverContext> = {
  subscription: async (_, __, context) => {
    const Authorization = context.req.headers["authorization"]!;

    const init = {
      headers: {
        Authorization,
      },
    };
    const subscriptionsRes = await fetch(SUBSCRIPTIONS_URL, init);

    const subscriptions: IServiceSubscriptions[] = await subscriptionsRes.json();
    const taggingsRes = await fetch(TAGGINGS_URL, init);
    const taggings: IServiceTagging[] = await taggingsRes.json();

    // writeToMock("subscriptions", { subscriptions });
    // writeToMock("taggings", { taggings });

    const x = normalizeSubscriptions(subscriptions, taggings);

    return x;
  },

  unread: async (parent, __, context) => {
    return [];
  },
};
