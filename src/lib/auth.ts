import lucia from "lucia-auth";
import { nextjs } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { ORM } from "./orm";
import { cookies } from "next/headers";

export const Auth = lucia({
	adapter: prisma(ORM),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
		};
	},
	sessionExpiresIn: {
		activePeriod: 1000 * 60 * 60 * 24 * 30, // 1 month
		idlePeriod: 0, // disable session renewal
	},
});

export async function getUserSession() {
	const authRequest = Auth.handleRequest({ cookies });
	return authRequest.validateUser();
}

export type AuthAdapter = typeof Auth;
