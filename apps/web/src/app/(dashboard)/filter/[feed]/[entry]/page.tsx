import { SingleEntryBody } from "$/components/entry/body";
import { SingleEntryWrapper } from "$/components/entry/wrapper";
import { SummaryAIStream } from "$/components/summarization/ai-stream";
import { getById } from "$/lib/controllers/entry";
import { notFound } from "next/navigation";

interface PageParams {
	entry: string;
}

export default async function EntryPage({ params }: { params: PageParams }) {
	try {
		let entry = await getById(params.entry);
		return (
			<SingleEntryWrapper date={entry.pubDate} title={entry.title} id={params.entry}>
				<SingleEntryBody
					link={entry.link}
					isFavorite={entry.favorite}
					content={entry.content}
					id={params.entry}
				>
					<SummaryAIStream content={entry.content} />
				</SingleEntryBody>
			</SingleEntryWrapper>
		);
	} catch (error) {
		notFound();
	}
}
