"use client";

import styles from "./error.module.css";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function FeedsErrorUI({ error, reset }: ErrorPageProps) {
	return (
		<div className={styles.errorContainer}>
			<div>
				<h2 className={styles.errorTitle}>Something went wrong!</h2>
				<div className={styles.errorMessage}>
					<p>{error.message}</p>
					{error.digest && (
						<p>
							Digest: <code>{error.digest}</code>
						</p>
					)}
				</div>
			</div>

			<button onClick={reset} type="button">
				Try again
			</button>
		</div>
	);
}
