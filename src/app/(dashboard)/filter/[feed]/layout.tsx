import { EntriesList } from '$/components/entries-list'
import type { EntryFilter } from '$/lib/filters'

interface FeedLayoutProps {
	entries: React.ReactNode
	children: React.ReactNode
	params: {
		feed: string
		filter: EntryFilter
	}
}

export default async function FeedListLayout({ children, entries }: FeedLayoutProps) {
	return (
		<>
			<aside className="col-span-3 h-full overflow-y-scroll border-r border-zinc-200 lg:h-auto dark:border-zinc-700">
				<div className="relative h-full dark:bg-zinc-900">{entries}</div>
			</aside>

			{children}
		</>
	)
}
