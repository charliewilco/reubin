"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Cog } from "lucide-react";
import { cx } from "class-variance-authority";

interface LinkItemProps {
	href: string;
	name: string;
	children: React.ReactNode;
}

export function LinkItem(props: LinkItemProps) {
	let pathName = usePathname();
	let isActive = pathName === props.href;

	let container = cx(
		"flex-1 justify-center flex items-center rounded-lg p-2",
		isActive
			? "bg-sky-400 text-zinc-100 dark:bg-sky-700 hover:bg-sky-900"
			: " text-zinc-700 dark:text-zinc-200 hover:bg-sky-700"
	);

	return (
		<Link key={props.name} href={props.href} className={container}>
			{props.children}
			<span className="sr-only">{props.name}</span>
		</Link>
	);
}

// unread / bookmarked / all / recommendations / appearance / settings

export function DashboardNavigationRail() {
	return (
		<nav
			aria-label="Sidebar"
			className="flex w-full items-center justify-center px-2 py-2 md:w-auto md:flex-col md:space-y-4">
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
