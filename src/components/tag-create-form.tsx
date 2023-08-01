"use client";
import { Button, SuperButton } from "./ui/button";
import { Label, Input, TextLabel } from "./ui/input";
import { createTag } from "$/actions";
import { experimental_useFormStatus } from "react-dom";

export function CreateTagForm() {
	let { pending } = experimental_useFormStatus();

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
