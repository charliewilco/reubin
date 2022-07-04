import Fastify from "fastify";
import mercurius, { type MercuriusOptions } from "mercurius";
import { schema } from "./schema";
import { context } from "./context";

// TODO: Create feed object
// TODO: Create tag object
// TODO: User sign up, registration
// TODO: Stripe integration

export const createApp = () => {
	const app = Fastify({ logger: false });

	const options: MercuriusOptions = {
		schema,
		graphiql: true,
		context: () => context,
	};

	app.register(mercurius, options);

	return app;
};
