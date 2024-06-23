"use client";

import { createTag } from "$/app/actions";
import { useFormStatus } from "react-dom";
import { Button, SuperButton } from "../ui/button";
import { Input, Label, TextLabel } from "../ui/input";

export function CreateTagForm() {
	let { pending } = useFormStatus();

	return (
		<form action={createTag} className="rounded p-4 shadow-sm dark:bg-zinc-800">
			<Label htmlFor="tag">
				<TextLabel>New Tag</TextLabel>
				<Input disabled={pending} name="name" id="tag" data-testid="add-tag-input" />
			</Label>

			<div className="mt-4 flex justify-between">
				<Button disabled={pending} type="reset">
					Reset
				</Button>
				<SuperButton disabled={pending} type="submit">
					Create
				</SuperButton>
			</div>
		</form>
	);
}
