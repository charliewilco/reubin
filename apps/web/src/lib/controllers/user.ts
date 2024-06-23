import * as base64 from "$/utils/node-base-64";
import { lucia } from "../auth";
import { prisma } from "../db";
import {} from "../email";
import { createVerificationEmail } from "../email";
import { createCustomer } from "../payments";

interface CreateUserArgs {
	username: string;
	email: string;
	password: string;
}

export async function createUser(_args: CreateUserArgs) {
	// let user = await lucia.createUser({
	// 	primaryKey: {
	// 		providerId: 'username',
	// 		providerUserId: username,
	// 		password: base64.decode(password),
	// 	},
	// 	attributes: {
	// 		username,
	// 		email,
	// 	},
	// })
	// await createCustomer(user)
	// await createVerificationEmail(user.userId, '...')
}

export async function updateEmail() {
	// needs to sync with Stripe
}

export async function remove(userId: string) {
	let user = await prisma.authUser.delete({
		where: {
			id: userId,
		},
	});

	return user;
}
