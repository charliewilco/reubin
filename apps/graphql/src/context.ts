import { PrismaClient } from "@prisma/client";
import { RSSKit } from "./rss";

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

export interface Context {
  prisma: PrismaClient;
  rss: RSSKit<unknown, unknown>;
}

export const context: Context = {
  prisma: prisma,
  rss: new RSSKit(),
};
