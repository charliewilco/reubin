import { Newspaper, Sparkles, Search, Mail, type LucideIcon } from "lucide-react";

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
				<div className="flex h-8 w-8 items-center justify-center rounded-md text-sky-600 dark:text-sky-400">
					<Icon className="h-6 w-6" aria-hidden="true" />
				</div>
				<p className="mt-5 text-lg font-medium leading-6 text-zinc-800 dark:text-zinc-200">
					{props.name}
				</p>
			</dt>
			<dd className="mt-2 font-mono text-base opacity-50">{props.description}</dd>
		</div>
	);
}

export function FeatureList() {
	return (
		<section>
			<div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
				<div className="col-span-1">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Take doom out of your evening scroll.
					</h2>
				</div>
				<dl className="col-span-2 mt-10 grid grid-cols-2  gap-x-8 gap-y-10 sm:mt-0">
					{features.map((props) => (
						<FeatureListItem key={props.name} {...props} />
					))}
				</dl>
			</div>
		</section>
	);
}
