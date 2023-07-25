import Link from "next/link";
import { Globe, Twitter, Github } from "lucide-react";
import { LogoSmall } from "./logo";
import { ProductNewsletter } from "./promo/product-newsletter";
import { Social } from "./promo/social-icons";

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
		<footer className="bg-zinc-100 dark:bg-zinc-800" role="contentinfo">
			<div className="mx-auto max-w-7xl px-2 pb-8 pt-16 sm:pt-24">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="mb-8">
						<LogoSmall />
					</div>
					<nav className="col-span-2">
						<ul role="list" className="grid grid-cols-3 gap-4 lg:grid-cols-4">
							{FOOTER_LINKS.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-sm leading-6 text-zinc-600 hover:text-zinc-900  dark:text-zinc-400 dark:hover:text-sky-400">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<ProductNewsletter />

				<div className="mt-8 border-t border-zinc-900/10 pt-8 dark:border-zinc-300/10 md:flex md:items-center md:justify-between">
					<div className="flex space-x-6 md:order-2">
						<a href="https://charliewil.co/" className="text-zinc-400 hover:text-zinc-500">
							<Globe className="h-6 w-6" />
						</a>
						<a
							href="https://mastodon.social/@charliewilco"
							className="ml-6 text-zinc-400 hover:text-zinc-500">
							<span className="sr-only">Mastodon</span>
							<Social.Mastodon className="h-6 w-6" />
						</a>
						<a
							href="https://twitter.com/_charliewilco"
							className="ml-6 text-zinc-400 hover:text-zinc-500">
							<span className="sr-only">Twitter</span>
							<Social.Twitter className="h-6 w-6" />
						</a>
						<a
							href="https://github.com/charliewilco"
							className="ml-6 text-zinc-400 hover:text-zinc-500">
							<span className="sr-only">GitHub</span>
							<Social.GitHub className="h-6 w-6" />
						</a>
					</div>
					<p className="mt-8 text-xs leading-5 text-zinc-500 md:order-1 md:mt-0">
						© {YEAR} Hephaestus Labs. All rights reserved.{" "}
					</p>
				</div>
			</div>
		</footer>
	);
}
