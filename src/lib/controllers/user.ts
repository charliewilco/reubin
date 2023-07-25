import base64 from "base-64";
import { Auth } from "../auth";
import { Services } from "../services";
import { prisma } from "../orm";

interface CreateUserArgs {
	username: string;
	email: string;
	password: string;
}

export class UserController {
	async create({ username, password, email }: CreateUserArgs) {
		let user = await Auth.createUser({
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

		await Services.mail.createVerificationEmail(user.userId, "...");
	}

	async remove(userId: string) {
		let user = await prisma.authUser.delete({
			where: {
				id: userId,
			},
		});

		return user;
	}
}
