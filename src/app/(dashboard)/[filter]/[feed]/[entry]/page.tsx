import { EntryBody } from "$/components/entry";
import { Controllers } from "$/lib/controllers";
import { notFound } from "next/navigation";

interface PageParams {
	entry: string;
}

export async function generateMetadata({ params }: { params: PageParams }) {
	let entry = await Controllers.entry.getById(params.entry);

	return {
		title: entry.title ?? "",
	};
}

export default async function EntryPage({ params }: { params: PageParams }) {
	try {
		let entry = await Controllers.entry.getById(params.entry);
		return <EntryBody title={entry.title} content={entry.content} />;
	} catch (error) {
		return notFound();
	}
}
