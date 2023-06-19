import Link from "next/link";
import { Home, Sparkles, Cog } from "lucide-react";

interface LinkItemProps {
	href: string;
	name: string;
	children: React.ReactNode;
}

export function LinkItem(props: LinkItemProps) {
	return (
		<Link
			key={props.name}
			href={props.href}
			className="flex items-center rounded-lg p-2 text-zinc-700 hover:bg-sky-700 dark:text-zinc-200">
			{props.children}
			<span className="sr-only">{props.name}</span>
		</Link>
	);
}

// unread / bookmarked / all / recommendations / appearance / settings

export function DashboardNavigationRail() {
	return (
		<nav aria-label="Sidebar" className="flex flex-col items-center space-y-4 px-2 py-2">
			<LinkItem href="/all" name="Home">
				<Home className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
			<LinkItem href="/recommendations" name="Recommendations">
				<Sparkles className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
			<LinkItem href="/settings" name="Settings">
				<Cog className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
		</nav>
	);
}
