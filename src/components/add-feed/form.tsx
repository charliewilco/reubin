import { SuperButton } from "../ui/button";
import { Label, Input, TextLabel } from "../ui/input";

interface AddFeedFormProps {
	onSubmit(formData: FormData): Promise<void>;
}

export function AddFeedForm(props: AddFeedFormProps) {
	return (
		<form action={props.onSubmit}>
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
