"use client";

import { useState } from "react";
import { EntryToolbar } from "./toolbar";

interface SingleEntryBodyProps {
	content: string;
	id: string;
	isFavorite: boolean;
	link: string;
	children?: React.ReactNode;
}

export function SingleEntryBody(props: SingleEntryBodyProps) {
	let [selected, setSelected] = useState<string | null>(null);
	let content = selected ?? props.content ?? "";
	return (
		<>
			<EntryToolbar
				content={content}
				id={props.id}
				isFavorite={props.isFavorite}
				onExtract={setSelected}
				link={props.link}>
				{props.children}
			</EntryToolbar>
			<section className="prose max-w-none dark:prose-invert">
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</section>
		</>
	);
}
