import { cookies } from "next/headers";

import { Auth, type AuthUserSession } from "./auth";
import { Email } from "./email";
import { EntrySearch } from "./search";
import { prisma } from "./orm";
import { RSSKit } from "./rss";
import { PurifyHTML } from "./purify-html";
import { Payments } from "./payments";
import { redis } from "./kv";

export class Services {
	static mail = new Email();
	static auth = Auth;
	static search = new EntrySearch();
	static rss = new RSSKit();
	static db = prisma;
	static kv = redis;
	static htmlPurify = PurifyHTML.create();
	static payments = new Payments();

	static async getUserSession(request?: Request): Promise<AuthUserSession> {
		let authRequest = this.auth.handleRequest({
			request,
			cookies,
		});

		return authRequest.validateUser();
	}
}
