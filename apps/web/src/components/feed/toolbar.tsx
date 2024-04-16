import { FeedSettings } from './settings'
import { FeedToolbarActions } from './toolbar-actions'

interface FeedToolbarProps {
	id: string
	filter: string
}

export function FeedToolbar(props: FeedToolbarProps) {
	return (
		<div
			className="flex justify-between border-b border-zinc-200 p-4 dark:border-zinc-700"
			role="toolbar"
		>
			<FeedSettings id={props.id} />
			<FeedToolbarActions {...props} />
		</div>
	)
}
