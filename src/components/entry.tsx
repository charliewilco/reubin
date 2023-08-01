"use client";
import { getDateString } from "$/utils/dates";
import { useState } from "react";
import { FavoriteEntry } from "./favorite-entry";
import { MarkAsRead } from "./mark-as-read";
import { GalleryVerticalEnd } from "lucide-react";
import { extractArticle } from "$/actions";

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
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">
			<MarkAsRead id={props.id} />
			<article className="mx-auto max-w-2xl px-8 pb-16">
				<header className="py-8">
					<div className="flex justify-end gap-4">
						<form>
							<button
								formAction={() =>
									extractArticle(props.id, props.link).then((result) => {
										if (result !== null) {
											// console.log(result)
											setSelected(result.content);
										}
									})
								}>
								<GalleryVerticalEnd />
							</button>
						</form>
						<FavoriteEntry id={props.id} isFavorite={props.isFavorite} />
					</div>
					<h1 className="mb-2 text-3xl font-bold">{props.title}</h1>
					<p className="font-mono text-sm opacity-50">{date}</p>
				</header>
				<section className="prose max-w-none dark:prose-invert">
					<div dangerouslySetInnerHTML={{ __html: selected ?? props.content ?? "" }} />
				</section>
			</article>
		</div>
	);
}
