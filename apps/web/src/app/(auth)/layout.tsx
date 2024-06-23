import { LogoDisplay } from "$/components/logo";
import { getUserSession } from "$/lib/controllers/session";
import { redirect } from "next/navigation";
import styles from "./auth.module.css";

interface LayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
	const result = await getUserSession();
	console.log(result);
	if (result?.session) redirect("/all");

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<LogoDisplay />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
