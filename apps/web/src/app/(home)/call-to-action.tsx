import Image from "next/image";
import Link from "next/link";
import styles from "./call-to-action.module.css";
import Newspaper from "./roman-kraft-unsplash.jpg";

export function CallToAction() {
	return (
		<section className={styles.container}>
			<div className={styles.inner}>
				<div>
					<div className={styles.content}>
						<h2>
							<span className="block">
								Ready to stay connected with all your favorite content?
							</span>
						</h2>
						<p>Get started with Reubin today.</p>
						<Link href="/register">Sign up for free</Link>
					</div>
				</div>

				<div>
					<div className={styles.imageContainer}>
						<Image src={Newspaper} className={styles.image} alt="App screenshot" priority />
					</div>
				</div>
			</div>
		</section>
	);
}
