import { Github, Globe, Twitter } from "lucide-react";
import Link from "next/link";
import { LogoSmall } from "./logo";
import { ProductNewsletter } from "./promo/product-newsletter";
import { Social } from "./promo/social-icons";
import styles from "./site-footer.module.css";

const YEAR = new Date().getFullYear();

export const FOOTER_LINKS = [
	{ name: "About", href: "/" },
	{ name: "Pricing", href: "/pricing" },
	{ name: "Changelog", href: "/changelog" },
	{ name: "Support", href: "/support" },

	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms of Service", href: "/terms" },

	{ name: "Login", href: "/login" },
	{ name: "Register", href: "/register" },
];

export function SiteFooter() {
	return (
		<footer className={styles.footer} role="contentinfo">
			<div>
				<div className={styles.linkContainer}>
					<div className={styles.logo}>
						<LogoSmall />
					</div>
					<nav>
						<ul>
							{FOOTER_LINKS.map((item) => (
								<li key={item.name}>
									<Link href={item.href} className={styles.link}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<ProductNewsletter />

				<div className={styles.subfooter}>
					<div className={styles.findMe}>
						<a href="https://charliewil.co/">
							<Globe />
						</a>
						<a href="https://mastodon.social/@charliewilco">
							<span className="sr-only">Mastodon</span>
							<Social.Mastodon />
						</a>
						<a href="https://twitter.com/_charliewilco">
							<span className="sr-only">Twitter</span>
							<Social.Twitter />
						</a>
						<a href="https://github.com/charliewilco">
							<span className="sr-only">GitHub</span>
							<Social.GitHub />
						</a>
					</div>
					<p className={styles.copyright}>© {YEAR} Hephaestus Labs. All rights reserved. </p>
				</div>
			</div>
		</footer>
	);
}
