import { getById } from "$/lib/controllers/feed";
import { getUserSession } from "$/lib/controllers/session";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UpdateFeedForm } from "./feed-update-form";

interface FeedSettingsProps {
	id: string;
}

export async function FeedSettings({ id }: FeedSettingsProps) {
	const result = await getUserSession();
	let feed = await getById(id, result?.user?.id);

	return (
		<Dialog>
			<DialogTrigger aria-label="Update feed">
				<Settings className="h-4 w-4" />
			</DialogTrigger>
			<DialogContent>
				<Dialog>
					<DialogTitle>Update feed: {feed.title}</DialogTitle>
					<UpdateFeedForm id={feed.id} initialTitle={feed.title} tagId={feed.tagId} />
				</Dialog>
			</DialogContent>
		</Dialog>
	);
}
