import { NextApiHandler } from "next";
import body from "../../recommended.json";

export interface ISectionData {
  title: string;
  data: Array<{
    displayName: string;
    link: string;
  }>;
}

const handler: NextApiHandler<{ recommended: ISectionData[] }> = async (
  _req,
  res
) => {
  res.json(body);
};

export default handler;
