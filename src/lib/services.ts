import { Auth } from "./auth";
import { Email } from "./email";
import { prisma } from "./orm";
import { Payments } from "./payments";
import { redis } from "./kv";

export class Services {
	static mail = new Email();
	static auth = Auth;
	static db = prisma;
	static kv = redis;
	static payments = new Payments();
}
