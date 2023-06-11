import { Resend } from "resend";

export class Email {
	public service = new Resend(process.env.EMAIL_API_KEY);
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
