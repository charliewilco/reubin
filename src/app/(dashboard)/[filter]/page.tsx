import { capitalize } from "$/utils/strings";

interface PageParams {
	filter: string;
}

export async function generateMetadata({ params }: { params: PageParams }) {
	let title = capitalize(params.filter);
	return {
		title: title + " Entries",
	};
}

export default async function FilterPage() {
	return (
		<div className="col-span-3 flex h-full items-center justify-center ">
			<pre className="opacity-50">Select a Feed</pre>
		</div>
	);
}
