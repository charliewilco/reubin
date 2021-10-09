import Mercury from "@postlight/mercury-parser";
import { NextApiHandler } from "next";
import { reubin } from "../../lib/api";

const handler: NextApiHandler<Mercury.ParseResult> = async (req, res) => {
  const result = await Mercury.parse(reubin.urlQueryToString(req.query.url));

  res.json(result);
};

export default handler;
