import Fastify from "fastify";
import mercurius, { type MercuriusOptions } from "mercurius";
import { schema } from "./schema";
import { context } from "./context";
import { RecommendedKeyArray } from "./recommendations";

export const createApp = () => {
  const app = Fastify({ logger: false });

  app.route({
    method: "GET",
    url: "/recommendations",
    handler(_req, res) {
      res.send({
        data: RecommendedKeyArray,
      });
    },
  });

  const options: MercuriusOptions = {
    schema,
    graphiql: true,
    context: () => context,
  };

  app.register(mercurius, options);

  return app;
};
