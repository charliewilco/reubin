import { mapTagsToFeed, createFakeFeeds, getFeedCount } from "../src/lib/map-tags-feed";

describe("Map Feeds", () => {
	test("basic return the same number of feeds as input", () => {
		const feeds = mapTagsToFeed(createFakeFeeds(12, 3));
		expect(getFeedCount(feeds)).toBe(12);
	});
});
