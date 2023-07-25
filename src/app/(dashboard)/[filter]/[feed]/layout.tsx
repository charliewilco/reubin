import { EntriesList } from "$/components/entries-list";
import { EntryFilter } from "$/lib/filters";

interface FeedLayoutProps {
	children: React.ReactNode;
	params: {
		feed: string;
		filter: EntryFilter;
	};
}

export default async function FeedListLayout({ children, params }: FeedLayoutProps) {
	return (
		<>
			<aside className="col-span-3 h-full overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700 lg:h-auto">
				<div className="relative dark:bg-zinc-900">
					<EntriesList feedId={params.feed} filter={params.filter} />
				</div>
			</aside>

			{children}
		</>
	);
}
