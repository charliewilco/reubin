import { RecommendationMap, type RecommendedField } from "$/lib/recommendations";
import Link from "next/link";
import { RecommendationCard } from "../recommendations/card";
import styles from "./list-empty.module.css";

export function EmptyFeedList() {
	let recommendations = RecommendationMap.get("Relevant") ?? [];
	return (
		<div className={styles.container}>
			<p>
				<span className={styles.helperText}>
					Looks like you have no feeds. Maybe you should add some?
				</span>{" "}
				<Link href="/recommendations" className={styles.link}>
					Find more here.
				</Link>
			</p>

			<ul className={styles.list}>
				{recommendations.map((r: RecommendedField) => {
					return <RecommendationCard {...r} key={r.link} feeds={[]} />;
				})}
			</ul>
		</div>
	);
}
