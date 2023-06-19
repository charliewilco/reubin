import { CheckCheck, RefreshCcw } from "lucide-react";
import { FeedSettings } from "./feed-settings";
import { Button } from "./ui/button";
import { markAllEntriesAsRead, refreshFeed } from "$/actions";

interface FeedToolbarProps {
	id: string;
	filter: string;
}

export function FeedToolbar(props: FeedToolbarProps) {
	return (
		<div
			className="flex justify-between border-b border-zinc-200 p-4 dark:border-zinc-700"
			role="toolbar">
			<FeedSettings id={props.id} />
			<form className="flex gap-4">
				<input type="hidden" name="id" value={props.id} />
				<input type="hidden" name="filter" value={props.filter} />
				<Button aria-label="Mark All as Read" formAction={markAllEntriesAsRead}>
					<CheckCheck className="h-4 w-4" />
				</Button>
				<Button aria-label="Refresh feed" formAction={refreshFeed}>
					<RefreshCcw className="h-4 w-4" />
				</Button>
			</form>
		</div>
	);
}
