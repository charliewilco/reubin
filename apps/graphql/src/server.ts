import Fastify from "fastify";
import mercurius, { type MercuriusOptions } from "mercurius";
import { schema } from "./schema";
import { context } from "./context";

const app = Fastify({ logger: false });

const options: MercuriusOptions = {
  schema,
  graphiql: true,
  context: () => context,
};

app.register(mercurius, options);

// TODO: Create feed object
// TODO: Create tag object
// TODO: User sign up, registration
// TODO: Stripe integration

export { app };

const start = async () => {
  try {
    app.listen({ port: 5300 }).then(() => {
      console.log(`\
    🚀 Server ready at: http://localhost:5300/graphiql
    ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify#using-the-graphql-api
    `);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
