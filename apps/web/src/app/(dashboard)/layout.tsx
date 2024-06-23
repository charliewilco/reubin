import { addFeed } from "$/app/actions";
import { AddFeed } from "$/components/add-feed/create";
import { AppHeader } from "$/components/app-header";
import { DashboardNavigationRail } from "$/components/dashboard-navigation";
import { getUserSession } from "$/lib/controllers/session";
import styles from "./dashboard.module.css";

interface LayoutProps {
	children: React.ReactNode;
	header: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
	const result = await getUserSession();
	return (
		<div className={styles.dashboard}>
			<div className={styles.inner}>
				<AppHeader username={result?.user?.username}>
					<div className={styles.header}>
						<AddFeed onAdd={addFeed} />
					</div>
				</AppHeader>
				<div className={styles.main}>
					<div className={styles.navigation}>
						<DashboardNavigationRail />
					</div>
					<main className={styles.container} id="feed-container">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
