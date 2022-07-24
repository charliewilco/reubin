import { createServer } from "@graphql-yoga/node";
import type { NextApiRequest, NextApiResponse } from "next";
import { context } from "../../server/context";
import { schema } from "../../server/schema";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default createServer<{
	req: NextApiRequest;
	res: NextApiResponse;
}>({
	schema: schema,
	context: () => context,
});
