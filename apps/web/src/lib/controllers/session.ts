import { cookies } from 'next/headers'
import type { CookiesFn } from '$/utils/cookies'
import { Auth, type AuthUserSession, type ValidatedSession } from '../auth'

export class SessionController {
	async getUserSession() {
		const sessionId = cookies().get(Auth.sessionCookieName)?.value ?? null
		if (!sessionId) return null

		const { user, session } = await Auth.validateSession(sessionId)

		try {
			if (session?.fresh) {
				const sessionCookie = Auth.createSessionCookie(session.id)
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			}
			if (!session) {
				const sessionCookie = Auth.createBlankSessionCookie()
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			}
		} catch {
			// Next.js throws error when attempting to set cookies when rendering page
		}
		return { user, session }
	}

	isValidatedSession(session: AuthUserSession): session is ValidatedSession {
		return session.user !== null
	}
}
