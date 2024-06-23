"use server";
import { ArticleExpander } from "$/lib/article-expansion";
import * as EntryController from "$/lib/controllers/entry";
import * as FeedController from "$/lib/controllers/feed";
import { getUserSession } from "$/lib/controllers/session";
import * as TagController from "$/lib/controllers/tag";
import type { Entry } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addFeed(formData: FormData) {
	let url = formData.get("url")?.toString();
	if (url === "" || typeof url === "undefined") {
		return;
	}

	const result = await getUserSession();
	if (result === null) {
		return;
	}
	if (result.user === null) {
		return;
	}
	await FeedController.add(url, result.user.id);
}

export async function addFeedFromRecommendation(formData: FormData) {
	let link = formData.get("link")?.toString();

	if (link === "" || typeof link === "undefined") {
		return;
	}

	const result = await getUserSession();
	if (result === null) {
		return;
	}
	if (result.user === null) {
		return;
	}

	await FeedController.add(link, result.user.id);
	revalidatePath("/recommendations");
	revalidatePath("/dashboard");
}

export async function addFavorite(id: string): Promise<Entry> {
	let entry = await EntryController.favorite(id);
	revalidateTag(`entry:${id}`);

	return entry;
}

export async function removeFeed(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const result = await getUserSession();
		if (result === null) {
			return;
		}
		if (result.user === null) {
			return;
		}
		await FeedController.remove(id, result.user.id);
		revalidatePath("/all");
		redirect("/all");
	}
}

export async function refreshFeed(formData: FormData) {
	let id = formData.get("id")?.toString();
	if (id) {
		let filter = formData.get("filter")?.toString();
		await FeedController.refresh(id);

		revalidatePath(`/${filter}/${id}`);
	}
}

export async function createTag(formData: FormData) {
	let name = formData.get("name") as string;
	if (name) {
		const result = await getUserSession();
		if (result === null) {
			return;
		}

		if (result.user === null) {
			return;
		}
		await TagController.add(name, result.user.id);
		revalidateTag("tag:all");
	}
}

export async function removeTag(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const result = await getUserSession();
		if (result === null) {
			return;
		}
		if (result.user === null) {
			return;
		}
		await TagController.remove(id, result.user.id);

		revalidateTag("tag:all");
	}
}

export async function attachFeedToTag(formData: FormData) {
	let feedId = formData.get("feedId") as string;
	let tagId = formData.get("tagId") as string;

	if (feedId && tagId) {
		const result = await getUserSession();

		if (result !== null) {
			if (result.user === null || !!result.user.id) {
				return;
			}
			await FeedController.attachTag(feedId, tagId, result.user.id);
		}
	}
}

export async function markAllEntriesAsRead(formData: FormData) {
	let id = formData.get("id") as string;
	if (id) {
		const result = await getUserSession();
		if (result !== null) {
			if (result.user === null) {
				return;
			}
			await FeedController.markAllAsRead(id, result.user.id);
		}

		revalidatePath("/all");
	}
}

export async function markEntryAsRead(entryId: string, path: string) {
	const result = await getUserSession();
	if (result?.user === null) {
		return;
	}

	await EntryController.markAsRead(entryId);
	revalidatePath(path);
}

export async function extractArticle(id: string, link: string) {
	return ArticleExpander.getArticle(id, link);
}
