import { SuperButton } from "./ui/button";
import { Label, Input, TextLabel } from "./ui/input";

import { Controllers } from "$/lib/controllers";
import { Auth } from "$/lib/auth";
import { cookies } from "next/headers";

async function addFeed(formData: FormData) {
	"use server";
	let url = formData.get("url") as string;
	if (url === "") {
		return;
	}

	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();
	await Controllers.feed.add(url, user.userId);
}

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
