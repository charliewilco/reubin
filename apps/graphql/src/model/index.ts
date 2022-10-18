import { Context } from "../context";
import { Services } from "../services";
import { EntryManager } from "./entry";
import { FeedManager } from "./feeds";
import { UserManager } from "./users";

export class Models {
  feeds: FeedManager;
  entry: EntryManager;
  users: UserManager;
  constructor(public context: Context, public services: Services) {
    this.feeds = new FeedManager(context);
    this.entry = new EntryManager(context);
    this.users = new UserManager(context, services);
  }
}
