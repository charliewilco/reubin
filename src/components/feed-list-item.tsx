"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { classNames } from "./ui/class-names";

interface FeedItemProps {
	id: string;
	title: string;
	filter: string;
}

export function FeedListItem(props: FeedItemProps) {
	let params = useParams();
	let isSelected = params?.feed === props.id;

	let listProps = isSelected ? { "data-testid": "selected" } : {};

	let href = isSelected ? `/${props.filter}` : `/${props.filter}/${props.id}`;

	return (
		<li {...listProps} key={props.id}>
			<div
				className={classNames("cursor-pointer p-2", isSelected && "bg-sky-500/25 text-white")}>
				<div className="flex justify-between">
					<Link href={href} className="flex-1">
						<h2 className="text-base">{props.title}</h2>
					</Link>
				</div>
			</div>
		</li>
	);
}
