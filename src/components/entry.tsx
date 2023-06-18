import { FavoriteEntry } from "./favorite-entry";
import { MarkAsRead } from "./mark-as-read";

interface EntryBodyProps {
	title: string;
	content: string;
	id: string;
	isFavorite?: boolean;
}

export function EntryBody(props: EntryBodyProps) {
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">
			<MarkAsRead id={props.id} />
			<FavoriteEntry id={props.id} isFavorite={props.isFavorite} />
			<article className="mx-auto max-w-2xl px-8 pb-16">
				<header className="py-8">
					<h1 className="text-3xl font-bold">{props.title}</h1>
				</header>
				<section className="prose prose-invert max-w-none">
					<div dangerouslySetInnerHTML={{ __html: props.content ?? "" }} />
				</section>
			</article>
		</div>
	);
}
