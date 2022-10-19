import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema";
import { getContext } from "./context";
import { RecommendedKeyArray } from "./recommendations";

export const createApp = () => {
  const app = Fastify({ logger: false });

  app.get("/recommendations", (_req, res) => {
    res.send({
      data: RecommendedKeyArray,
    });
  });

  app.register(mercurius, {
    schema,
    graphiql: true,
    context: getContext,
  });

  return app;
};
