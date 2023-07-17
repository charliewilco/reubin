"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Entry } from "@prisma/client";
import { cva } from "class-variance-authority";
import { getDateString } from "$/utils/dates";

interface EntryListItemProps {
	entry: Entry;
	filter: string;
}

let entryContainer = cva(
	["cursor-pointer", "border-b", "border-zinc-200", "dark:border-zinc-700"],
	{
		variants: {
			state: {
				selected: ["bg-sky-500", "text-white", "opacity-100"],
				unread: [],
				read: ["opacity-50"],
			},
		},
		defaultVariants: {},
	}
);

export function EntryListItem(props: EntryListItemProps) {
	let params = useParams();
	let isSelected = props.entry.id === params?.entry;

	let href = isSelected
		? `/${props.filter}/${props.entry.feedId}`
		: `/${props.filter}/${props.entry.feedId}/${props.entry.id}`;

	// let isRead = !props.entry.unread;
	// let isBoth = isRead && isSelected;

	let dateString = getDateString(props.entry.pubDate);

	return (
		<li
			key={props.entry.id}
			className={entryContainer({
				state: isSelected ? "selected" : props.entry.unread ? "unread" : "read",
			})}>
			<Link href={href} className="flex p-4">
				<div className="flex-1">
					<h3 className="mb-2 text-base">{props.entry.title}</h3>
					<p className="text-xs uppercase tracking-wide">{dateString}</p>
				</div>
			</Link>
		</li>
	);
}
