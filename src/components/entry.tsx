"use client";
import { getDateString } from "$/utils/dates";
import { useState } from "react";
import { MarkAsRead } from "./mark-as-read";

import { EntryToolbar } from "./entry/toolbar";

interface EntryBodyProps {
	title: string;
	content: string;
	id: string;
	isFavorite: boolean;
	date: Date;
	link: string;
}

export function EntryBody(props: EntryBodyProps) {
	let date = getDateString(props.date);
	let [selected, setSelected] = useState<string | null>(null);
	let content = selected ?? props.content ?? "";
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">
			<MarkAsRead id={props.id} />
			<article className="mx-auto max-w-2xl px-8 pb-16">
				<header className="py-8">
					<h1 className="mb-2 text-3xl font-bold">{props.title}</h1>
					<p className="font-mono text-sm opacity-50">{date}</p>
				</header>
				<EntryToolbar
					content={content}
					id={props.id}
					isFavorite={props.isFavorite}
					onExtract={setSelected}
					link={props.link}
				/>
				<section className="prose max-w-none dark:prose-invert">
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</section>
			</article>
		</div>
	);
}
