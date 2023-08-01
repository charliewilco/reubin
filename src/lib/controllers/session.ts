import { cookies } from "next/headers";
import { Auth, type AuthUserSession, type ValidatedSession } from "../auth";

export class SessionController {
	async getUserSession(request?: Request): Promise<AuthUserSession> {
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
