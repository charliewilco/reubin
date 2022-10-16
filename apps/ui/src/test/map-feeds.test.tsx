import { mapTagsToFeed, createFakeFeeds, getFeedCount } from "../lib/map-tags-feed";

describe("Map Feeds", () => {
  it("basic return the same number of feeds as input", () => {
    const feeds = mapTagsToFeed(createFakeFeeds(12, 3));
    expect(getFeedCount(feeds)).toBe(12);
  });
});
