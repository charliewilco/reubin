import { Trash2 } from "lucide-react";
import { Button, SuperButton } from "./ui/button";
import { Input, Label, TextLabel } from "./ui/input";
import { removeFeed } from "$/actions";
import { TagSelectionList } from "./tag-lists";

interface UpdateFeedFormProps {
	initialTitle?: string;
	id: string;
	tagId: string | null;
}

export function UpdateFeedForm(props: UpdateFeedFormProps) {
	return (
		<form className="space-y-4">
			<Label htmlFor="feed-title" aria-labelledby="feed-title">
				<TextLabel id="feed-title">Feed Name</TextLabel>
				<Input
					name="feed-title"
					data-testid="update-feed-name"
					defaultValue={props.initialTitle}
				/>
			</Label>
			<input type="hidden" name="id" value={props.id} />
			<TagSelectionList />
			<div className="mt-8 flex items-center justify-between">
				<div className="block text-red-500">
					<Button
						aria-label="Remove Feed"
						className="flex items-center"
						formAction={removeFeed}>
						<Trash2 size={18} />
						<span className="ml-2 text-sm font-semibold">Unsubscribe</span>
					</Button>
				</div>

				<SuperButton type="submit" aria-label="Update Feed">
					<span>Save</span>
				</SuperButton>
			</div>
		</form>
	);
}
