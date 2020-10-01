import { ApolloError } from "apollo-server-micro";
import { deriveHeader, ResolverContext } from "./context";
import { IMutationResolvers } from "./types";
import { AUTHENTICATE_URL, createEntryURL, UNREAD_URL } from "./urls";

export const Mutation: IMutationResolvers<ResolverContext> = {
  // bookmark: async (_, { id }) => {
  //   return id;
  // },
  markAsRead: async (_, { id }, context) => {
    const init = deriveHeader(
      context,
      "DELETE",
      JSON.stringify({
        unread_entries: [parseInt(id)],
      })
    );
    try {
      const m = await fetch(UNREAD_URL, init);
      const ids: number[] = await m.json();
      const entryRes = await fetch(
        createEntryURL(ids[0]),
        deriveHeader(context)
      );
      const entry = await entryRes.json();
      return entry;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  markAsUnread: async (_, { id }, context) => {
    const init = deriveHeader(
      context,
      "POST",
      JSON.stringify({
        unread_entries: [parseInt(id)],
      })
    );
    try {
      const m = await fetch(UNREAD_URL, init);
      const ids: number[] = await m.json();
      const entryRes = await fetch(
        createEntryURL(ids[0]),
        deriveHeader(context)
      );
      const entry = await entryRes.json();
      return entry;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  login: async (_, { hash }) => {
    const authResponse = await fetch(AUTHENTICATE_URL, {
      headers: {
        Authorization: `Basic ${hash}`,
      },
    });

    return { isValid: authResponse.ok };
  },
};
