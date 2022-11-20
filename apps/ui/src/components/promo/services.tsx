import { Social } from "./social-icons";

export function Services() {
	return (
		<section>
			<div className="text-center">
				<figure>
					<div className="flex justify-center gap-8 text-sky-700 dark:text-sky-200">
						<Social.Reddit className="h-16 w-16" />
						<Social.Substack className="h-16 w-16" />
						<Social.Twitter className="h-16 w-16" />
						<Social.Medium className="h-16 w-16" />
						<Social.Wordpress className="h-16 w-16" />
					</div>
					<figcaption className="mx-auto max-w-md pt-16">
						<p className="bg-gradient-to-tr from-sky-200 to-sky-600 bg-clip-text text-6xl font-bold tracking-tighter text-transparent">
							Track feeds from all your favorite services
						</p>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
