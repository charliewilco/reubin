import { Card } from "$/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";
import { LoginForm } from "./form";

export const metadata: Metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div>
			<header className={styles.header}>
				<h2 className={styles.title}>Sign in to your account</h2>
				<p>
					<span className="opacity-75">Or sign up for an account</span>{" "}
					<Link href="/register" className="text-sky-600">
						here
					</Link>
				</p>
			</header>
			<Card className={styles.content}>
				<LoginForm />
			</Card>
		</div>
	);
}
