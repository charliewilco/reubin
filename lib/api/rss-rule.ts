import { Rule, RuleSet } from "metascraper";
import { url, toRule } from "@metascraper/helpers";

const toFeedURL = toRule(url);

export const rss: Rule = (): RuleSet => {
  return {
    feed: [
      toFeedURL(($: any) => {
        return $('link[type="application/x.atom+xml"]').attr("href");
      }),
      toFeedURL(($: any) => {
        return $('link[type="application/rss+xml"]').attr("href");
      }),
      toFeedURL(($: any) => {
        return $('link[type="application/atom+xml"]').attr("href");
      }),
      toFeedURL(($: any) => {
        const selector = 'link[type="text/xml"]';
        const title = $(selector).attr("title");
        const containsRSS = title.search(/RSS/i) != -1;
        const href = $(selector).attr("href");
        if (containsRSS) {
          return href;
        }
      }),
      toFeedURL(($: any) => {
        const selector = 'link[type="application/rdf+xml"]';
        const title = $(selector).attr("title");
        const containsRSS = title.search(/RSS/i) != -1;
        const href = $(selector).attr("href");
        if (containsRSS) {
          return href;
        }
      }),
    ],
  };
};
