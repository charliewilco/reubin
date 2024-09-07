import type { EntryFilter } from "$/lib/filters";
import Utils from "@r/utils";
import styles from "./page.module.css";

interface PageParams {
	filter: EntryFilter;
}

export async function generateMetadata({ params }: { params: PageParams }) {
	let title = Utils.Strings.capitalize(params.filter ?? "No Filter");
	return {
		title: `${title} Entries`,
	};
}

export default async function FilterPage(_: { params: PageParams }) {
	return (
		<div className={styles.container}>
			<pre className="opacity-50">Select a Feed</pre>
		</div>
	);
}
