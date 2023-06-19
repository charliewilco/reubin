"use client";
import { useParams } from "next/navigation";
import type { Entry } from "@prisma/client";
import Link from "next/link";
import { classNames } from "./ui/class-names";

interface EntryListItemProps {
	entry: Entry;
	filter: string;
}

export function EntryListItem(props: EntryListItemProps) {
	let params = useParams();
	let isSelected = props.entry.id === params?.entry;

	let href = isSelected
		? `/${props.filter}/${props.entry.feedId}`
		: `/${props.filter}/${props.entry.feedId}/${props.entry.id}`;

	return (
		<li
			key={props.entry.id}
			className={classNames(
				"cursor-pointer border-b border-zinc-200 dark:border-zinc-700",
				!props.entry.unread && "opacity-50",
				isSelected && "bg-sky-500 text-white opacity-100"
			)}>
			<Link href={href} className="block p-4">
				<h3 className="mb-2 text-base">{props.entry.title}</h3>
				<p className="text-xs uppercase tracking-wide">{props.entry.pubDate.toDateString()}</p>
			</Link>
		</li>
	);
}
