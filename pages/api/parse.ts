import { NextApiHandler } from "next";
import { reubin } from "../../lib/api";

const handler: NextApiHandler = async (req, res) => {
  const feed = await reubin.rss.getMagicDetails(
    reubin.urlQueryToString(req.query.url)
  );

  res.status(200).json(feed);
};

export default handler;
