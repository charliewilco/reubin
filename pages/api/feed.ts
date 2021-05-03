import { NextApiHandler } from "next";
import cheerio from "cheerio";
import Parser from "rss-parser";

const toString = (_: string | string[]): string => {
  return Array.isArray(_) ? _.join("") : _;
};

const getRSSLinks = (siteContents: string, url: string) => {
  const $ = cheerio.load(siteContents, {
    xmlMode: true,
    decodeEntities: true,
  });

  const links: string[] = $('link[type="application/rss+xml"]')
    .map((_, element) => cheerio(element).attr("href"))
    .get();

  return links.map((href) => new URL(href, url).toString());
};

const parser = new Parser();

const handler: NextApiHandler<
  { links: string[] } | { message: string }
> = async (req, res) => {
  const { url } = req.query;
  const sanitizedURL = toString(url);

  const response = await fetch(sanitizedURL);

  if (response.ok) {
    const siteContents = await response.text();
    try {
      await parser.parseString(siteContents);
      res.status(200).json({
        links: [sanitizedURL],
      });
      res.end();
    } catch (error) {
      // At this point, we're sure this isn't already a valid XML structure for RSS
      // Now we'll check if it's HTML with RSS Links
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      const links = getRSSLinks(siteContents, sanitizedURL);

      if (links.length === 0) {
        res.status(404).json({ message: "Couldn't find any RSS link" });
        res.end();
      }

      res.status(200).json({
        links,
      });
      res.end();
    }
  } else {
    res.status(404).json({ message: "An error occured" });
    res.end();
  }
};

export default handler;
