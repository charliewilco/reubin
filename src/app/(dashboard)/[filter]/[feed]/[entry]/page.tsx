import { EntryBody } from "$/components/entry";
import { Controllers } from "$/lib/controllers";
import { notFound } from "next/navigation";

interface PageParams {
	entry: string;
}

export async function generateMetadata({ params }: { params: PageParams }) {
	let entry = await Controllers.entry.getById(params.entry);

	if (entry) {
	}

	console.log(
		JSON.stringify(
			{
				id: entry.id,
				title: entry.title,
			},
			null,
			2
		),
		params,
		"Generate Metadata"
	);

	return {
		title: entry.title ?? "",
	};
}

export default async function EntryPage({ params }: { params: PageParams }) {
	try {
		let entry = await Controllers.entry.getById(params.entry);
		return <EntryBody title={entry.title} content={entry.content} id={params.entry} />;
	} catch (error) {
		return notFound();
	}
}
