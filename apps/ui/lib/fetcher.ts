import { GraphQLClient } from "graphql-request";
import type { KeyedMutator } from "swr";
import { getSdk } from "./types";

const client = new GraphQLClient("/graphql");

export const sdk = getSdk(client);

export const addFeed = async (url: string, mutate: KeyedMutator<any>) => {
  try {
    await sdk.CreateFeed({
      url,
    });

    mutate();
  } catch (error: any) {
    throw new Error(error);
  }
};
