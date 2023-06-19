"use server";

import { cookies } from "next/headers";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";
import { revalidatePath } from "next/cache";

export async function addFeed(formData: FormData) {
	let url = formData.get("url") as string;
	if (url === "") {
		return;
	}

	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();
	await Controllers.feed.add(url, user.userId);
}

export async function addFeedFromRecommendation(formData: FormData) {
	let link = formData.get("link") as string;

	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();
	await Controllers.feed.add(link, user.userId);
	revalidatePath("/recommendations");
}

export async function addFavorite(id: string) {
	await Controllers.entry.favorite(id);
}

export async function removeFeed(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const authRequest = Auth.handleRequest({ cookies });
		const { user } = await authRequest.validateUser();
		await Controllers.feed.remove(id, user.userId);
	}
}

export async function refreshFeed(id: string, filter: string) {
	await Controllers.feed.refresh(id);

	revalidatePath(`/${filter}/${id}`);
}

export async function createTag(formData: FormData) {
	let name = formData.get("name") as string;
	if (name) {
		const authRequest = Auth.handleRequest({ cookies });
		const { user } = await authRequest.validateUser();
		await Controllers.tags.add(name, user.userId);
		revalidatePath("/settings");
	}
}

export async function removeTag(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const authRequest = Auth.handleRequest({ cookies });
		const { user } = await authRequest.validateUser();
		await Controllers.tags.remove(id, user.userId);
	}
}
