import { EntryController } from "./controller-feed-entry";
import { FeedController } from "./controller-feed";
import { TagController } from "./controller-tag";

export class Controllers {
	static feed = new FeedController();
	static entry = new EntryController();
	static tags = new TagController();
}
