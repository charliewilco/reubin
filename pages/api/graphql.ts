import { createServer } from "@graphql-yoga/node";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../graphql/schema";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: schema,
});

export default server;
