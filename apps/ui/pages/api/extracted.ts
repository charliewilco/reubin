import { NextApiHandler } from "next";
import { getContent } from "../../lib/html";

const handler: NextApiHandler<any> = async (_req, res) => {
  const result = {
    content: ""
  };

  if (result.content !== null) {
    result.content = getContent(result.content);
  }

  res.json(result);
};

export default handler;
