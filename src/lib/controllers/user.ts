import * as base64 from "$/utils/node-base-64";
import { Services } from "../services";

interface CreateUserArgs {
	username: string;
	email: string;
	password: string;
}

export class UserController {
	async create({ username, password, email }: CreateUserArgs) {
		let user = await Services.auth.createUser({
			primaryKey: {
				providerId: "username",
				providerUserId: username,
				password: base64.decode(password),
			},
			attributes: {
				username,
				email,
			},
		});

		await Services.payments.createCustomer(user);
		await Services.mail.createVerificationEmail(user.userId, "...");
	}

	async updateEmail() {
		// needs to sync with Stripe
	}

	async updateSubscription(stripeId: string, _planId: string) {
		await Services.db.authUser.update({
			where: {
				stripeId,
			},
			data: {},
		});
	}

	async remove(userId: string) {
		let user = await Services.db.authUser.delete({
			where: {
				id: userId,
			},
		});

		return user;
	}
}
