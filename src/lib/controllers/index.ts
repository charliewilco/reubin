import { UserController } from "./user";
import { EntryController } from "./entry";
import { FeedController } from "./feed";
import { TagController } from "./tag";
import { SessionController } from "./session";

export class Controllers {
	static feed = new FeedController();
	static entry = new EntryController();
	static tags = new TagController();
	static users = new UserController();
	static session = new SessionController();
}
