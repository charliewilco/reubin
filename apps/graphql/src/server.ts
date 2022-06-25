import fastify from "fastify";
import mercurius, { MercuriusOptions } from "mercurius";
import { schema } from "./schema";
import { context } from "./context";

const app = fastify({ logger: true });

const options: MercuriusOptions = {
  schema,
  graphiql: true,
  context: () => context,
};

app.register(mercurius, options);

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
