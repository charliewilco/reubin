import lucia from "lucia-auth";
import { nextjs } from "lucia-auth/middleware";
import prismaAdapter from "@lucia-auth/adapter-prisma";
import { prisma } from "./orm";
import { cookies } from "next/headers";
import type { Theme } from "@prisma/client";
import { $ENV } from "./env";

interface TransformedUser {
	userId: string;
	username: string;
	preferredTheme: Theme;
	isVerified: boolean;
	refreshInterval: number;
}

export const Auth = lucia({
	adapter: prismaAdapter(prisma as any),
	env: $ENV.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs(),
	transformDatabaseUser: (userData): TransformedUser => {
		return {
			userId: userData.id,
			username: userData.username,
			preferredTheme: userData.preferredTheme,
			isVerified: userData.isVerified,
			refreshInterval: userData.refreshInterval,
		};
	},
	sessionExpiresIn: {
		activePeriod: 1000 * 60 * 60 * 24 * 30, // 1 month
		idlePeriod: 0, // disable session renewal
	},
});

interface LuciaSessionType {
	sessionId: string;
	userId: string;
	activePeriodExpiresAt: Date;
	idlePeriodExpiresAt: Date;
	state: "idle" | "active";
	fresh: boolean;
}

interface ValidatedSession {
	user: TransformedUser;
	session: Readonly<LuciaSessionType>;
}

interface NullSession {
	user: null;
	session: null;
}

export type AuthUserSession = ValidatedSession | NullSession;

export function isValidatedSession(session: AuthUserSession): session is ValidatedSession {
	return session.user !== null;
}

export async function getUserSession(): Promise<AuthUserSession> {
	const authRequest = Auth.handleRequest({ cookies });
	return authRequest.validateUser();
}

export type AuthAdapter = typeof Auth;
