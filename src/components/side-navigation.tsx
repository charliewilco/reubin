"use client";
import Link from "next/link";
import isEqual from "react-fast-compare";
import { memo } from "react";

import { Home, Gift, Settings2, Newspaper, Bookmark } from "lucide-react";

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

function _SideNavigation() {
	return (
		<nav aria-label="Sidebar" className="flex flex-col items-center space-y-4 px-2">
			<LinkItem href="/feeds" name="Home">
				<Home className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
			<LinkItem href="/feeds" name="All">
				<Newspaper className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
			<LinkItem href="/bookmarks" name="Bookmarks">
				<Bookmark className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
			<LinkItem href="/recommendations" name="Recommendations">
				<Gift className="h-6 w-6" aria-hidden="true" />
			</LinkItem>

			<LinkItem href="/settings" name="Settings">
				<Settings2 className="h-6 w-6" aria-hidden="true" />
			</LinkItem>
		</nav>
	);
}

const SideNavigation = memo(_SideNavigation, isEqual);

SideNavigation.displayName = "SideNavigation";

export { SideNavigation };
