"use server";
import type { Entry } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Controllers } from "$/lib/controllers";
import { ArticleExpander } from "$/lib/article-expansion";

export async function addFeed(formData: FormData) {
	let url = formData.get("url") as string;
	if (url === "") {
		return;
	}

	const { user } = await Controllers.session.getUserSession(cookies);
	if (user === null) {
		return;
	}
	await Controllers.feed.add(url, user.userId);
}

export async function addFeedFromRecommendation(formData: FormData) {
	let link = formData.get("link") as string;

	const { user } = await Controllers.session.getUserSession(cookies);
	if (user === null) {
		return;
	}
	await Controllers.feed.add(link, user.userId);
	revalidatePath("/recommendations");
	revalidatePath("/dashboard");
}

export async function addFavorite(id: string): Promise<Entry> {
	let entry = await Controllers.entry.favorite(id);
	revalidateTag(`entry:${id}`);

	return entry;
}

export async function removeFeed(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const { user } = await Controllers.session.getUserSession(cookies);
		if (user === null) {
			return;
		}
		await Controllers.feed.remove(id, user.userId);
		revalidatePath("/all");
		redirect("/all");
	}
}

export async function refreshFeed(formData: FormData) {
	let id = formData.get("id") as string;
	let filter = formData.get("filter") as string;
	await Controllers.feed.refresh(id);

	revalidatePath(`/${filter}/${id}`);
}

export async function createTag(formData: FormData) {
	let name = formData.get("name") as string;
	if (name) {
		const { user } = await Controllers.session.getUserSession(cookies);
		if (user === null) {
			return;
		}
		await Controllers.tags.add(name, user.userId);
		revalidateTag("tag:all");
	}
}

export async function removeTag(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const { user } = await Controllers.session.getUserSession(cookies);
		if (user === null) {
			return;
		}
		await Controllers.tags.remove(id, user.userId);

		revalidateTag("tag:all");
	}
}

export async function attachFeedToTag(formData: FormData) {
	let feedId = formData.get("feedId") as string;
	let tagId = formData.get("tagId") as string;

	if (feedId && tagId) {
		const { user } = await Controllers.session.getUserSession(cookies);
		if (user === null) {
			return;
		}
		await Controllers.feed.attachTag(feedId, tagId, user.userId);
	}
}

export async function markAllEntriesAsRead(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const { user } = await Controllers.session.getUserSession(cookies);
		if (user === null) {
			return;
		}
		await Controllers.feed.markAllAsRead(id, user.userId);
	}
}

export async function markEntryAsRead(entryId: string) {
	const { user } = await Controllers.session.getUserSession(cookies);
	if (user === null) {
		return;
	}

	await Controllers.entry.markAsRead(entryId);
	revalidateTag(`entry:${entryId}`);
}

export async function extractArticle(id: string, link: string) {
	return ArticleExpander.getArticle(id, link);
}
