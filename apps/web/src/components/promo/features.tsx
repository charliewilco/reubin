import { type LucideIcon, Mail, Newspaper, Search, Sparkles } from "lucide-react";
import styles from "./features.module.css";

const features = [
	{
		name: "Unlimited Feeds",
		description: "Subscribe to as many feeds as you like, no restrictions.",
		icon: Newspaper,
	},
	{
		name: "AI-powered Summaries",
		description: "Get concise and insightful article summaries using advanced AI technology.",
		icon: Sparkles,
	},
	{
		name: "Full-Text Search",
		description: "Instantly find articles with powerful full-text search capabilities.",
		icon: Search,
	},
	{
		name: "Newsletter Digests",
		description: "Get a weekly digest of your favorite newsletters.",
		icon: Mail,
	},
];

interface FeatureListItemProps {
	name: string;
	description: string;
	icon: LucideIcon;
}

export function FeatureListItem(props: FeatureListItemProps) {
	let Icon = props.icon;
	return (
		<div>
			<dt>
				<div className={styles.iconContainer}>
					<Icon aria-hidden="true" />
				</div>
				<p className={styles.featureTitle}>{props.name}</p>
			</dt>
			<dd className={styles.description}>{props.description}</dd>
		</div>
	);
}

export function FeatureList() {
	return (
		<section>
			<div className={styles.features}>
				<div>
					<h2>Take doom out of your evening scroll.</h2>
				</div>
				<dl className={styles.featuresList}>
					{features.map((props) => (
						<FeatureListItem key={props.name} {...props} />
					))}
				</dl>
			</div>
		</section>
	);
}
