import { PrismaClient } from "@prisma/client";
import { RSSKit } from "@reubin/rss";

export interface Context {
	prisma: PrismaClient;
	rss: RSSKit<unknown, unknown>;
}

const prisma = new PrismaClient();
const rss = new RSSKit();

export const context: Context = {
	prisma,
	rss,
};
