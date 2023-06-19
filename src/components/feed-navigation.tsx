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
				"from-sky-800",
				"to-sky-500",
				"font-bold",
				"shadow-md",
			],
		},
	},
});

export function FeedNavigation() {
	let params = useParams();

	let isUnreadActive = params?.filter === "unread";
	let isAllActive = params?.filter === "all";
	let isBookmarkActive = params?.filter === "favorite";

	return (
		<nav>
			<ul className="flex justify-center gap-2 p-2 text-sm">
				<li>
					<Link
						href="/unread"
						className={link({ active: isUnreadActive ? "active" : "inactive" })}>
						Unread
					</Link>
				</li>
				<li>
					<Link href="/all" className={link({ active: isAllActive ? "active" : "inactive" })}>
						All
					</Link>
				</li>
				<li>
					<Link
						href="/favorite"
						className={link({ active: isBookmarkActive ? "active" : "inactive" })}>
						Bookmarks
					</Link>
				</li>
			</ul>
		</nav>
	);
}
