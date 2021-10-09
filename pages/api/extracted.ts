import Mercury from "@postlight/mercury-parser";
import { NextApiHandler } from "next";
import { reubin } from "../../lib/api";
import { getContent } from "../../lib/html";

const handler: NextApiHandler<Mercury.ParseResult> = async (req, res) => {
  const result = await Mercury.parse(reubin.urlQueryToString(req.query.url));

  if (result.content !== null) {
    result.content = getContent(result.content);
  }

  res.json(result);
};

export default handler;
