import { services as defaultServices, type Services } from "../services";
import { EntryManager } from "./entry";
import { FeedManager } from "./feeds";
import { UserManager } from "./users";

export class Models {
  feeds: FeedManager;
  entry: EntryManager;
  users: UserManager;
  constructor(public services: Services = defaultServices) {
    this.feeds = new FeedManager(services);
    this.entry = new EntryManager(services);
    this.users = new UserManager(services);
  }
}
