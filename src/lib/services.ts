import { Auth } from "./auth";
import { Email } from "./email";
import { EntrySearch } from "./search";
import { ORM } from "./orm";
import { RSSKit } from "./rss";
import { CronJob } from "./cron";
import { PurifyHTML } from "./purify-html";

export class Services {
	static mail = new Email();
	static auth = Auth;
	static search = new EntrySearch();
	static rss = new RSSKit();
	static cron = new CronJob();
	static db = ORM;
	static htmlPurify = PurifyHTML.create();
}
