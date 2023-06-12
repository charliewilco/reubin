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
	return <h1>TopLevelFilterPage</h1>;
}
