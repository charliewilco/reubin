import { describe, it, expect } from "@jest/globals";
import { reubin } from "../api";

const DUMMY_SUBSCRIPTIONS = [
  "https://daverupert.com/atom.xml",
  "https://charliewil.co/rss.xml",
  "https://typescript.wtf/rss.xml",
];

describe("API", () => {
  it("calls subscriptions", async () => {
    const items = await reubin.rss.getMagicFeedItems(DUMMY_SUBSCRIPTIONS[2]);
    const { items: unparsedItems } = await reubin.parser.parseURL(
      DUMMY_SUBSCRIPTIONS[2]
    );

    expect(items[0].title).toBe(unparsedItems[0].title);
  });

  it("can get rss links from header", async () => {
    const { feed } = await reubin.metadata.resolve("https://typescript.wtf");
    expect(feed).toBe("https://typescript.wtf/rss.xml");
  });
});
