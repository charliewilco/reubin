"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./navigation.module.css";

interface FeedFilterLinkProps {
	isActive: boolean;
	filter: string;
	children?: React.ReactNode;
}

function FeedFilterLink(props: FeedFilterLinkProps) {
	let params = useParams();

	let href = `/${props.filter}`;

	if (params.feed) {
		href += `/${params.feed}`;
	}

	return (
		<li>
			<Link href={href} className={props.isActive ? styles.activeLink : styles.link}>
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
			<ul className={styles.navigation}>
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
