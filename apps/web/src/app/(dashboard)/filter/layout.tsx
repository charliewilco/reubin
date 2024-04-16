import { FeedNavigation } from '$/components/feed/navigation'
import type { EntryFilter } from '$/lib/filters'

interface FilterLayoutProps {
	feeds: React.ReactNode
	children: React.ReactNode
	params: {
		filter: EntryFilter
	}
}

export default async function FilterLayout({ children, feeds, params }: FilterLayoutProps) {
	console.log(params, 'layout component')
	return (
		<div className="h-full w-full flex-1 grid-cols-12 lg:grid">
			<aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
				<div className="relative h-full dark:bg-zinc-900">
					<div className="w-full">
						<FeedNavigation />
						{feeds}
					</div>
				</div>
			</aside>
			{children}
		</div>
	)
}
