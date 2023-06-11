import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Auth } from "$/lib/auth";
import { RegisterForm } from "$/components/register-form";
import { Card } from "$/components/ui/card";

export const metadata: Metadata = {
	title: "Sign up | Reubin",
};

export default async function RegistrationPage() {
	const authRequest = Auth.handleRequest({ cookies });
	const { session } = await authRequest.validateUser();
	if (session) redirect("/dashboard");

	return (
		<div>
			<header className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold dark:text-gray-100">Sign up for an account</h2>
				<p>
					<span className="opacity-75">Or sign in to your account</span>{" "}
					<Link href="/login" className="text-sky-600">
						here
					</Link>
				</p>
			</header>
			<Card className="px-8 py-6">
				<RegisterForm />
			</Card>
		</div>
	);
}
