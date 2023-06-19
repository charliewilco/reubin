import { Settings } from "lucide-react";

import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "./ui/dialog";
import { UpdateFeedForm } from "./feed-update-form";
import { Controllers } from "$/lib/controllers";
import { Auth } from "$/lib/auth";
import { cookies } from "next/headers";

interface FeedSettingsProps {
	id: string;
}

export async function FeedSettings(props: FeedSettingsProps) {
	let authRequest = Auth.handleRequest({ cookies: cookies });
	const { user } = await authRequest.validateUser();

	let feed = await Controllers.feed.getById(props.id, user.userId);
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
