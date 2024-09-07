import { addFeed } from "$/app/actions";
import { SuperButton } from "../ui/button";
import { Label, Input, TextLabel } from "../ui/input";

export function AddFeedForm() {
	return (
		<form action={addFeed}>
			<Label htmlFor="url">
				<TextLabel>URL</TextLabel>

				<Input name="url" id="url" data-testid="add-feed-url" />
			</Label>

			<div className="mt-8 flex justify-end">
				<SuperButton type="submit">Submit</SuperButton>
			</div>
		</form>
	);
}
