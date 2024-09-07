import { FeedNavigation } from "$/components/feed/navigation";
import type { EntryFilter } from "$/lib/filters";
import styles from "./layout.module.css";

interface FilterLayoutProps {
	feeds: React.ReactNode;
	children: React.ReactNode;
	params: {
		filter: EntryFilter;
	};
}

export default async function FilterLayout({ children, feeds }: FilterLayoutProps) {
	return (
		<div className={styles.layout}>
			<aside className={styles.column}>
				<div className={styles.columnInner}>
					<div className="w-full">
						<FeedNavigation />
						{feeds}
					</div>
				</div>
			</aside>
			{children}
		</div>
	);
}
