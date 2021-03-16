import { describe, it, expect } from "@jest/globals";
import { API } from "../api/api";

const DUMMY_SUBSCRIPTIONS = [
  "https://daverupert.com/atom.xml",
  "https://charliewil.co/rss.xml",
  "https://typescript.wtf/rss.xml",
];

const api = new API();

describe("API", () => {
  it("calls subscriptions", async () => {
    const items = await api.rss.getFeedItems(DUMMY_SUBSCRIPTIONS[0]);
    expect(items).toBe(
      expect.arrayContaining([
        {
          title: "📩 : TypeScript for Everyone 🚀",
          created_at: "2021-01-11T00:00:00.000Z",
          author: "Charlie Peters",
        },
      ])
    );
  });
});
