import lucia from "lucia-auth";
import { nextjs } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { ORM } from "./orm";

export const Auth = lucia({
	adapter: prisma(ORM),
	env: "DEV", // "PROD" if prod
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

export type AuthAdapter = typeof Auth;
