import { Home, Sparkles, Cog } from "lucide-react";
import { ActiveLinkItem } from "./ui/active-link";
import styles from "./dashboard-navigation.module.css";

// unread / bookmarked / all / recommendations / appearance / settings

export function DashboardNavigationRail() {
	return (
		<nav aria-label="Sidebar" className={styles.navigation}>
			<ActiveLinkItem className={styles.link} href="/all">
				<Home className={styles.icon} aria-hidden="true" />
				<span className="sr-only">Home</span>
			</ActiveLinkItem>
			<ActiveLinkItem className={styles.link} href="/recommendations">
				<Sparkles className={styles.icon} aria-hidden="true" />
				<span className="sr-only">Recommendations</span>
			</ActiveLinkItem>
			<ActiveLinkItem className={styles.link} href="/settings">
				<Cog className={styles.icon} aria-hidden="true" />
				<span className="sr-only">Settings</span>
			</ActiveLinkItem>
		</nav>
	);
}
