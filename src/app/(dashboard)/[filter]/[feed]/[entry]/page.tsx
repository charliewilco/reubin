import { EntryBody } from "$/components/entry";
import { Controllers } from "$/lib/controllers";

export default async function EntryPage({
	params,
}: {
	params: {
		entry: string;
	};
}) {
	let entry = await Controllers.entry.getById(params.entry);
	return (
		<section
			aria-labelledby="primary-heading"
			className="col-span-7 h-full overflow-y-scroll dark:bg-zinc-800">
			<div className="relative">
				<h1 id="primary-heading" className="sr-only">
					Entry
				</h1>
				<EntryBody title={entry.title} content={entry.content} />
			</div>
		</section>
	);
}
