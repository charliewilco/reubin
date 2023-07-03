"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cva } from "class-variance-authority";

let link = cva(["rounded-md", "py-1", "px-2"], {
	variants: {
		active: {
			inactive: ["opacity-75"],
			active: [
				"opacity-100",
				"bg-gradient-to-tr",
				"dark:from-sky-800",
				"dark:to-sky-500",
				"from-sky-500",
				"to-sky-300",
				"font-bold",
				"shadow-md",
			],
		},
	},
});

interface FeedFilterLinkProps {
	isActive: boolean;
	filter: string;

	children?: React.ReactNode;
}
function FeedFilterLink(props: FeedFilterLinkProps) {
	let params = useParams();

	let href = `/${props.filter}`;
	let className = link({ active: props.isActive ? "active" : "inactive" });

	if (params.feed) {
		href += `/${params.feed}`;
	}

	return (
		<li>
			<Link href={href} className={className}>
				{props.children}
			</Link>
		</li>
	);
}

export function FeedNavigation() {
	let params = useParams();

	let isUnreadActive = params?.filter === "unread";
	let isAllActive = params?.filter === "all";
	let isBookmarkActive = params?.filter === "favorite";

	return (
		<nav>
			<ul className="flex justify-center gap-2 p-2 text-sm">
				<FeedFilterLink filter="unread" isActive={isUnreadActive}>
					Unread
				</FeedFilterLink>
				<FeedFilterLink filter="all" isActive={isAllActive}>
					All
				</FeedFilterLink>

				<FeedFilterLink filter="favorite" isActive={isBookmarkActive}>
					Bookmarks
				</FeedFilterLink>
			</ul>
		</nav>
	);
}
