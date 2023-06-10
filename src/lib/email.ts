import { Resend } from "resend";

export class Email {
	public service = new Resend();
	async createVerificationEmail(email: string, token: string) {}
	async sendEmail() {}
}
