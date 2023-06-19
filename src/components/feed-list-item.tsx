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

	let innerClassName = classNames("cursor-pointer p-2", isSelected && "bg-sky-600 text-white");

	return (
		<li {...listProps} key={props.id}>
			<div className={innerClassName}>
				<div className="flex justify-between">
					<Link href={href} className="flex-1">
						<h2 className="text-sm">{props.title}</h2>
					</Link>
				</div>
			</div>
		</li>
	);
}
