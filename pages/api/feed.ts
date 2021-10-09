import { NextApiHandler } from "next";
import { reubin, FeedAPIResponse } from "../../lib/api";

const handler: NextApiHandler<FeedAPIResponse> = async (req, res) => {
  try {
    const data = await reubin.metadata.resolve(
      reubin.urlQueryToString(req.query.url)
    );
    res.status(200).json(data);
    res.end();
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
    res.end();
  }
};

export default handler;
