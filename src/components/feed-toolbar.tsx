import { CheckCheck, RefreshCcw } from "lucide-react";
import { FeedSettings } from "./feed-settings";
import { Button } from "./ui/button";

interface FeedToolbarProps {
	id: string;
}

export function FeedToolbar(_props: FeedToolbarProps) {
	return (
		<div
			className="flex justify-between border-b border-zinc-200 p-4 dark:border-zinc-700"
			role="toolbar">
			<FeedSettings id={_props.id} />
			<div className="flex gap-4">
				<Button aria-label="Mark All as Read">
					<CheckCheck className="h-4 w-4" />
				</Button>
				<Button aria-label="Refresh feed">
					<RefreshCcw className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
