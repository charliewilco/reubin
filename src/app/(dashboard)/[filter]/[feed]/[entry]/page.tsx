import { EntryBody } from "$/components/entry";
import { Controllers } from "$/lib/controllers";
import { notFound } from "next/navigation";

interface PageParams {
	entry: string;
}

export default async function EntryPage({ params }: { params: PageParams }) {
	try {
		let entry = await Controllers.entry.getById(params.entry);
		return (
			<EntryBody
				date={entry.pubDate}
				isFavorite={entry.favorite}
				title={entry.title}
				content={entry.content}
				id={params.entry}
			/>
		);
	} catch (error) {
		notFound();
	}
}
