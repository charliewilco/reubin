import { GraphQLClient } from "graphql-request";
import { getSdk } from "./github-sdk";

export const graphQLClient = new GraphQLClient(
  "https://api.github.com/graphql",
  {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  }
);

export const sdk = getSdk(graphQLClient);
