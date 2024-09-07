import { addFeedFromRecommendation } from "$/app/actions";
import type { Feed } from "@prisma/client";
import { CheckCircle, Rss } from "lucide-react";
import styles from "./recommendation-card.module.css";

interface RecommendationCardProps {
	displayName: string;
	link: string;
	feeds?: Feed[];
}

export function RecommendationCard(props: RecommendationCardProps) {
	let feeds = props.feeds ?? [];

	const hasFeed = feeds.findIndex((f) => f?.feedURL === props.link) > -1;

	let content = (
		<form action={addFeedFromRecommendation} className="block w-full text-center">
			<input type="hidden" name="link" value={props.link} />
			<button type="submit" className={styles.subscribeButton}>
				<Rss className={styles.icon} aria-hidden="true" />
				<span className={styles.iconSpacing}>Subscribe</span>
			</button>
		</form>
	);

	if (hasFeed) {
		content = (
			<div className={styles.subscribedButton}>
				<CheckCircle className={styles.subscribedIcon} aria-hidden="true" />
				<span className={styles.iconSpacing}>Subscribed</span>
			</div>
		);
	}

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.content}>
					<h3 className={styles.title}>{props.displayName}</h3>
					<p className={styles.link}>{props.link}</p>
				</div>
			</div>
			<div className={styles.content}>
				<div className="flex">{content}</div>
			</div>
		</div>
	);
}
