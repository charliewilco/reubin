import { RotateCw } from "lucide-react";
import { FeedSettings } from "./feed-settings";
import { Button } from "./ui/button";

interface FeedToolbarProps {
	onRefresh(): void;
}

export function FeedToolbar(props: FeedToolbarProps) {
	return (
		<div
			className="flex justify-between border-b border-zinc-200 p-4 dark:border-zinc-700"
			role="toolbar">
			<FeedSettings />

			<Button onClick={props.onRefresh} aria-label="Refresh feed">
				<RotateCw />
			</Button>
		</div>
	);
}
