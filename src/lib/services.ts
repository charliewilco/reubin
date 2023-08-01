import { cookies } from "next/headers";

import { Auth, type AuthUserSession } from "./auth";
import { Email } from "./email";
import { prisma } from "./orm";
import { RSSKit } from "./rss";
import { Payments } from "./payments";
import { redis } from "./kv";

export class Services {
	static mail = new Email();
	static auth = Auth;
	static rss = new RSSKit();
	static db = prisma;
	static kv = redis;
	static payments = new Payments();

	/**
	 * @deprecated Moved to `Controllers.session.getUserSession`
	 * @param request
	 * @returns
	 */
	static async getUserSession(request?: Request): Promise<AuthUserSession> {
		let authRequest = this.auth.handleRequest({
			request,
			cookies,
		});

		return authRequest.validateUser();
	}
}
