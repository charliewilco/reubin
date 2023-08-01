import { Plus } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { AddFeedForm } from "./feed-create-form";

interface AddFeedProps {
	onAdd(formData: FormData): Promise<void>;
}

export function AddFeed(props: AddFeedProps) {
	return (
		<Dialog>
			<DialogTrigger aria-label="Add Feed">
				<Plus size={24} />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Add Feed</DialogTitle>
				<DialogDescription
					className="mb-8 mt-2 text-sm opacity-50"
					data-testid="add-feed-modal">
					Add a website URL to see if it has an RSS feed.
				</DialogDescription>
				<AddFeedForm onSubmit={props.onAdd} />
			</DialogContent>
		</Dialog>
	);
}
