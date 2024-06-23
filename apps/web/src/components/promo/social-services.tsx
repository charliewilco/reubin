import { Social } from "./social-icons";
import styles from "./social-services.module.css";

export function SocialServices() {
	return (
		<section className={styles.services}>
			<div className="text-center">
				<figure>
					<div className={styles.iconContainer}>
						<Social.Substack />
						<Social.Medium />
						<Social.Wordpress />
						<Social.Mastodon />
					</div>
					<figcaption className="mx-auto max-w-md pt-16">
						<p className="bg-gradient-to-tr from-sky-300 to-sky-800 bg-clip-text text-6xl font-bold tracking-tighter text-transparent dark:from-sky-200 dark:to-sky-600">
							Track feeds from all your favorite services
						</p>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
