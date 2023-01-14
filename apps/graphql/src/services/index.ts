import { PrismaClient } from "@prisma/client";
import { RSSKit } from "@reubin/rsskit";
import { Passwords } from "./passwords";
import { TokenManager } from "./tokens";
import * as Validations from "./validations";

let prisma: PrismaClient;

declare global {
	var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export { prisma };

export interface Services {
	orm: PrismaClient;
	token: TokenManager;
	password: Passwords;
	validations: typeof Validations;
	rss: RSSKit<unknown, unknown>;
}

export const services: Services = {
	token: new TokenManager(),
	password: new Passwords(),
	validations: Validations,
	rss: new RSSKit(),
	orm: prisma,
};
