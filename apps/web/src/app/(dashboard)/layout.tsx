import { AddFeedDialog } from "$/components/add-feed/create";
import { AppHeader } from "$/components/app-header";
import { DashboardNavigationRail } from "$/components/dashboard-navigation";
import styles from "./dashboard.module.css";

interface LayoutProps {
	children: React.ReactNode;
	header: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
	return (
		<div className={styles.dashboard}>
			<div className={styles.inner}>
				<AppHeader>
					<div className={styles.header}>
						<AddFeedDialog />
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
