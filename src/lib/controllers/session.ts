import type { CookiesFn } from "$/utils/cookies";
import { Auth, type AuthUserSession, type ValidatedSession } from "../auth";

export class SessionController {
	async getUserSession(cookies: CookiesFn, request?: Request): Promise<AuthUserSession> {
		let authRequest = Auth.handleRequest({
			request,
			cookies,
		});

		return authRequest.validateUser();
	}

	isValidatedSession(session: AuthUserSession): session is ValidatedSession {
		return session.user !== null;
	}
}
