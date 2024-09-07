import { Plus } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import styles from "./add-feed.module.css";
import { AddFeedForm } from "./form";

export function AddFeedDialog() {
	return (
		<Dialog>
			<DialogTrigger aria-label="Add Feed">
				<Plus size={24} />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Add Feed</DialogTitle>
				<DialogDescription className={styles.dialogContent} data-testid="add-feed-modal">
					Add a website URL to see if it has an RSS feed.
				</DialogDescription>
				<AddFeedForm />
			</DialogContent>
		</Dialog>
	);
}
