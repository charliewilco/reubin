import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolver } from "./resolvers";
import typeDefs from "./typedefs.graphql";

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolver,
});
