import { Card } from "$/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";
import { RegisterForm } from "./form";

export const metadata: Metadata = {
	title: "Sign up",
};

export default function RegistrationPage() {
	return (
		<div>
			<header className={styles.header}>
				<h2 className={styles.title}>Sign up for an account</h2>
				<p>
					Or sign in to your account <Link href="/login">here</Link>.
				</p>
			</header>
			<Card className={styles.content}>
				<RegisterForm />
			</Card>
		</div>
	);
}
