import Auth from "next-auth";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {} from "@node-rs/argon2";
import { hash } from "@node-rs/bcrypt";
import { prisma, type User } from "$/lib/db";
import { env } from "./env";

async function authorize(credentials: Partial<Record<"email" | "password", string>>) {
	let user = null;

	if (!credentials.email || !credentials.password) {
		throw new Error("Missing credentials.");
	}
	// logic to salt and hash password
	const pwHash = await hash(credentials.password);

	// logic to verify if the user exists
	user = await prisma.user.findUnique({
		where: {
			email: credentials.email,
		},
	});

	if (!user) {
		// No user found, so this is their first attempt to login
		// meaning this is also the place you could do registration
		throw new Error("User not found.");
	}

	// return user object with their profile data
	return user;
}

export const {
	handlers,
	signIn,
	signOut,
	auth,
	unstable_update: update,
} = Auth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Resend,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
				let user: null | User = null;

				if (!credentials.email || !credentials.password) {
					throw new Error("Missing credentials.");
				}
				// logic to salt and hash password
				const pwHash = await hash(String(credentials.password));

				// logic to verify if the user exists
				user = await prisma.user.findUnique({
					where: {
						email: String(credentials.email),
					},
				});

				if (!user) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error("User not found.");
				}

				// return user object with their profile data
				return user;
			},
		}),
	],
	debug: env.NODE_ENV === "development",
});
