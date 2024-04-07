import { cookies } from 'next/headers'
import { Controllers } from '$/lib/controllers'

import { FeedListItem } from '$/components/feed/feed-list-item'
import { EmptyFeedList } from '$/components/feed/list-empty'
import type { EntryFilter } from '$/lib/filters'

interface Params {
	filter: EntryFilter
}

export default async function FeedPage({ params }: { params: Params }) {
	console.log(params, 'page component')
	const { user } = await Controllers.session.getUserSession(cookies)

	let feeds = await Controllers.feed.getAll(user?.userId)

	if (feeds) {
		if (feeds.length === 0) {
			return <EmptyFeedList />
		}

		return (
			<div>
				<ul role="list">
					{feeds.map((feed) => (
						<FeedListItem
							key={feed?.id}
							id={feed?.id}
							title={feed?.title}
							filter={params.filter}
						/>
					))}
				</ul>
			</div>
		)
	}

	return null
}
