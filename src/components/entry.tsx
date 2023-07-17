import { getDateString } from "$/utils/dates";
import { FavoriteEntry } from "./favorite-entry";
import { MarkAsRead } from "./mark-as-read";

interface EntryBodyProps {
	title: string;
	content: string;
	id: string;
	isFavorite: boolean;
	date: Date;
}

export function EntryBody(props: EntryBodyProps) {
	let date = getDateString(props.date);
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">
			<MarkAsRead id={props.id} />
			<article className="mx-auto max-w-2xl px-8 pb-16">
				<header className="py-8">
					<div className="flex justify-end">
						<FavoriteEntry id={props.id} isFavorite={props.isFavorite} />
					</div>
					<h1 className="mb-2 text-3xl font-bold">{props.title}</h1>
					<p className="font-mono text-sm opacity-50">{date}</p>
				</header>
				<section className="prose max-w-none dark:prose-invert">
					<div dangerouslySetInnerHTML={{ __html: props.content ?? "" }} />
				</section>
			</article>
		</div>
	);
}
