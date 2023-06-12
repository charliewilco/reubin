"use client"
import Link from "next/link";
import { useParams } from 'next/navigation';
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
	return (
		<li
			{...listProps}
			key={props.id}
			className="p-1"
			>
			<div className={classNames("cursor-pointer p-2 rounded-sm", isSelected && "bg-sky-500/50 text-white")} >
			<div className="flex justify-between">
				<Link href={`/${props.filter}/${props.id}/`} className="flex-1">
					<h2 className="text-base">{props.title}</h2>
				</Link>
			</div>
		</div>
		</li>
	);
}
