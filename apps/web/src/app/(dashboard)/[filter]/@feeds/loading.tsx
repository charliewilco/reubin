import styles from "./loading.module.css";
const FAKE_FEEDS = new Array(10).fill(null);

export default function LoadingFeeds() {
	return (
		<div>
			{FAKE_FEEDS.map((_, index) => (
				<div key={index.toString()} className="px-4 py-2">
					<div className="animate-pulse">
						<div className="h-4 w-full rounded bg-zinc-400 dark:bg-zinc-700" />
					</div>
				</div>
			))}
		</div>
	);
}
