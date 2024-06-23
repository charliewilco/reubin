import React from "react";
import styles from "./product-newsletter.module.css";

export function ProductNewsletter() {
	return (
		<div className={styles.container}>
			<div>
				<h3 className={styles.heading}>Subscribe to our newsletter</h3>
				<p className={styles.description}>
					The latest news, articles, and resources, sent to your inbox weekly.
				</p>
			</div>
			<form className={styles.form}>
				<label htmlFor="email-address" className={styles.label}>
					Email address
				</label>
				<input
					type="email"
					name="email-address"
					id="email-address"
					autoComplete="email"
					required
					className={styles.input}
					placeholder="Enter your email"
				/>
				<div className={styles.buttonContainer}>
					<button type="submit" className={styles.button}>
						Subscribe
					</button>
				</div>
			</form>
		</div>
	);
}
