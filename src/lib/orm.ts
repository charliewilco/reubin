import { PrismaClient } from "@prisma/client";

declare global {
	var ORM: PrismaClient | undefined;
}

let ORM: PrismaClient;

if (process.env.NODE_ENV === "production") {
	ORM = new PrismaClient();
} else {
	if (!global.ORM) {
		global.ORM = new PrismaClient();
	}
	ORM = global.ORM;
}

export { ORM };
