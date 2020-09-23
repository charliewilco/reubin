import { IMutationResolvers } from "./types";
import { AUTHENTICATE_URL } from "./urls";

export const Mutation: IMutationResolvers = {
  bookmark: async (_, { id }) => {
    return id;
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
