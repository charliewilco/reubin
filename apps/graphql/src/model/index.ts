import type { Services } from "../services";
import { EntryController } from "./entry";
import { FeedController } from "./feeds";
import { TagController } from "./tags";
import { UserController } from "./users";

export class Models {
	feeds: FeedController;
	entry: EntryController;
	users: UserController;
	tag: TagController;
	constructor(public services: Services) {
		this.feeds = new FeedController(services);
		this.entry = new EntryController(services);
		this.users = new UserController(services);
		this.tag = new TagController(services);
	}
}
