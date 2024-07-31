import { Resend } from "resend";

export class EmailService {
	private emails: Resend;

	constructor(apiKey: string) {
		this.emails = new Resend(apiKey);
	}

	async sendEmail() {
		let response = await this.emails.emails.send({
			from: "onboarding@resend.dev",
			to: "charliewilc0@pm.me",
			subject: "Hello World",
			html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
		});

		return response;
	}

	async createVerificationEmail(_email: string, _token: string) {}
}
