import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolver } from "./resolvers";

export const schema = makeExecutableSchema({
  resolvers: resolver,
  typeDefs: __dirname + "/../schema.graphql",
});
