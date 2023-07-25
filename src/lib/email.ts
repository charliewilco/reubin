import { Resend } from "resend";
import { $ENV } from "./env";

export class Email {
	public service = new Resend($ENV.RESEND_API_KEY);
	async createVerificationEmail(_email: string, _token: string) {}
	async sendEmail() {
		await this.service.emails.send({
			from: "onboarding@resend.dev",
			to: "charliewilc0@pm.me",
			subject: "Hello World",
			html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
		});
	}
}
