import { env } from "$/lib/env";
import { Resend } from "resend";

const emails = new Resend(env.RESEND_API_KEY);

export async function sendEmail() {
	let response = await emails.emails.send({
		from: "onboarding@resend.dev",
		to: "charliewilc0@pm.me",
		subject: "Hello World",
		html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
	});

	return response;
}

export async function createVerificationEmail(_email: string, _token: string) {}
