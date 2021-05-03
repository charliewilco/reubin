import { describe, it, expect } from "@jest/globals";
import { API } from "../api";

const DUMMY_SUBSCRIPTIONS = [
  "https://daverupert.com/atom.xml",
  "https://charliewil.co/rss.xml",
  "https://typescript.wtf/rss.xml",
];

const api = new API();

describe("API", () => {
  it("calls subscriptions", async () => {
    const items = await api.rss.getMagicFeedItems(DUMMY_SUBSCRIPTIONS[2]);
    const trueItems = await api.rss.parseURL(DUMMY_SUBSCRIPTIONS[2]);
    items.forEach(({ link, guid, title }) =>
      console.log("Transformed", { link, title, guid })
    );

    trueItems.items.forEach((_) =>
      console.log("Parsed", { link: _.link, guid: _.guid })
    );

    expect(items).toBe(
      expect.arrayContaining([
        {
          title: "The Basic Concepts",
          author: "Charlie Peters",
        },
      ])
    );
  });
});
