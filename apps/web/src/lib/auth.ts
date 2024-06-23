import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { Theme } from "@prisma/client";
import { Lucia } from "lucia";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { prisma } from "./db";

const adapter = new PrismaAdapter(prisma.authSession, prisma.authUser);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		console.log(attributes);
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	userId: string;
	username: string;
	preferredTheme: Theme;
	isVerified: boolean;
	refreshInterval: number;
}

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session?.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	},
);
