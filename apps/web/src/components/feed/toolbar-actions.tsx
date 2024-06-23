"use client";
import { markAllEntriesAsRead, refreshFeed } from "$/app/actions";
import { CheckCheck, Loader, RefreshCcw } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FeedToolbarProps {
	id: string;
	filter: string;
}

export function FeedToolbarActions(props: FeedToolbarProps) {
	let { pending } = useFormStatus();
	return (
		<form className="flex gap-4">
			<input type="hidden" name="id" value={props.id} />
			<input type="hidden" name="filter" value={props.filter} />
			<Button aria-label="Mark All as Read" formAction={markAllEntriesAsRead}>
				<CheckCheck className="h-4 w-4" />
			</Button>
			<Button aria-label="Refresh feed" formAction={refreshFeed}>
				{!pending ? <RefreshCcw className="h-4 w-4" /> : <Loader className="h-4 w-4" />}
			</Button>
		</form>
	);
}
