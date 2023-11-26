import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "$/components/auth-flow/login-form";
import { Card } from "$/components/ui/card";

export const metadata: Metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div>
			<header className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold dark:text-gray-100">Sign in to your account</h2>
				<p>
					<span className="opacity-75">Or sign up for an account</span>{" "}
					<Link href="/register" className="text-sky-600">
						here
					</Link>
				</p>
			</header>
			<Card className="px-8 py-6">
				<LoginForm />
			</Card>
		</div>
	);
}
