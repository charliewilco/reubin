import bcrypt from "bcryptjs";

export class Passwords {
	async isValidPassword(password: string, hashPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashPassword);
	}

	async getHash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);

		return bcrypt.hash(password, salt);
	}
}
