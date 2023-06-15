import { FeedList } from "$/components/feed-list";
import type { EntryFilter } from "$/lib/filters";

interface FilterLayoutProps {
	children: React.ReactNode;
	params: {
		filter: EntryFilter;
	};
}

export default async function FilterLayout({ children, params }: FilterLayoutProps) {
	return (
		<div className="grid h-full w-full flex-1 grid-cols-12">
			<aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
				<div className="relative h-full dark:bg-zinc-900">
					<FeedList currentFilter={params.filter} />
				</div>
			</aside>
			{children}
		</div>
	);
}
