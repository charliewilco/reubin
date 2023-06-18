"use server";

import { cookies } from "next/headers";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";

export async function addFeed(formData: FormData) {
	let url = formData.get("url") as string;
	if (url === "") {
		return;
	}

	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();
	await Controllers.feed.add(url, user.userId);
}
