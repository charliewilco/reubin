import { Models } from "../src/model";
import { EntryController } from "../src/model/entry";
import { FeedController } from "../src/model/feeds";
import { TagController } from "../src/model/tags";

describe("Models", () => {
	test("model controllers instantiate", () => {
		const m = new Models({} as any);
		expect(m).toBeTruthy();
		expect(m.entry).toBeInstanceOf(EntryController);
		expect(m.feeds).toBeInstanceOf(FeedController);
		expect(m.tag).toBeInstanceOf(TagController);
	});

	test.todo("tag has title");
	test.todo("entries refine content");
	test.todo("entries with tags upload to CDN");
	test.todo("feeds have favicons");
	test.todo("feeds have both homepage and feedURL");
});
