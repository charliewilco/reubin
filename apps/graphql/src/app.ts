import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { getContext, type Context } from "./context";
import { resolvers } from "./resolvers";
import typeDefs from "./schema.graphql";

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export const server = new ApolloServer<Context>({
	schema,
});

export function createApp() {
	return startStandaloneServer<Context>(server, {
		context: async ({ req }) => getContext(req),
		listen: { port: 4000 },
	});
}
