import { NextApiHandler } from "next";
import { API } from "../../lib/api";

const api = new API();

const toString = (_: string | string[]): string => {
  return Array.isArray(_) ? _.join("") : _;
};

const handler: NextApiHandler = async (req, res) => {
  console.log(req.query);
  const { url } = req.query;

  const feed = await api.rss.getMagicDetails(toString(url));

  res.status(200).json(feed);
};

export default handler;
