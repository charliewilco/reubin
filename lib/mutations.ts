import { IMutationResolvers } from "./types";
import { AUTHENTICATE_URL } from "./urls";

export const Mutation: IMutationResolvers = {
  // bookmark: async (_, { id }) => {
  //   return id;
  // },
  login: async (_, { hash }) => {
    console.log("HELLO FROM LOGIN MUTATION");
    const authResponse = await fetch(AUTHENTICATE_URL, {
      headers: {
        Authorization: `Basic ${hash}`,
      },
    });

    return { isValid: authResponse.ok };
  },
};
