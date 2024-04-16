import { Lucia } from 'lucia'
import { sql } from './db'
import { NeonHTTPAdapter } from '@lucia-auth/adapter-postgresql'

const adapter = new NeonHTTPAdapter(sql, {
	user: 'auth_user',
	session: 'user_session',
})

const Auth = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production',
		},
	},
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof Auth
	}
}

interface TransformedUser {
	userId: string
	username: string
	preferredTheme: any
	isVerified: boolean
	refreshInterval: number
}

// export const Auth = lucia({
// 	adapter: prismaAdapter(prisma as any),
// 	env: Env.$vars.NODE_ENV === "development" ? "DEV" : "PROD",
// 	middleware: nextjs(),
// 	transformDatabaseUser: (userData): TransformedUser => {
// 		return {
// 			userId: userData.id,
// 			username: userData.username,
// 			preferredTheme: userData.preferredTheme,
// 			isVerified: userData.isVerified,
// 			refreshInterval: userData.refreshInterval,
// 		};
// 	},
// 	sessionExpiresIn: {
// 		activePeriod: 1000 * 60 * 60 * 24 * 30, // 1 month
// 		idlePeriod: 0, // disable session renewal
// 	},
// });

interface LuciaSessionType {
	sessionId: string
	userId: string
	activePeriodExpiresAt: Date
	idlePeriodExpiresAt: Date
	state: 'idle' | 'active'
	fresh: boolean
}

export interface ValidatedSession {
	user: TransformedUser
	session: Readonly<LuciaSessionType>
}

export interface NullSession {
	user: null
	session: null
}

export type AuthUserSession = ValidatedSession | NullSession

export function isValidatedSession(session: AuthUserSession): session is ValidatedSession {
	return session.user !== null
}

// export type AuthAdapter = typeof Auth;

export { Auth }
