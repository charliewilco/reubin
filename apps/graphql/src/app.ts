import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { schema } from "./schema";
import { getContext } from "./context";
import { Context } from "vm";

export const server = new ApolloServer<Context>({
	schema,
});

export function createApp() {
	return startStandaloneServer<Context>(server, {
		context: async ({ req, res }) => getContext(req),
		listen: { port: 4000 },
	});
}
