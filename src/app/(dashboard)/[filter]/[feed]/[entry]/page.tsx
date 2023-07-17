import { EntryBody } from "$/components/entry";
import { Controllers } from "$/lib/controllers";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

interface PageParams {
	entry: string;
}

export default async function EntryPage({ params }: { params: PageParams }) {
	try {
		let entry = await unstable_cache(
			() => Controllers.entry.getById(params.entry),
			[params.entry],
			{
				revalidate: 60,
				tags: [`entry:${params.entry}`],
			}
		)();
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
		return notFound();
	}
}
