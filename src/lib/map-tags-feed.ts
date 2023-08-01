import { createWeakUID } from "@charliewilco/toolkit";
import type { Feed, Tag } from "@prisma/client";

export interface TagsToMap {
	tags: Tag[];
	feeds: Feed[];
}

export function mapTagsToFeed(query: TagsToMap) {
	const m = new Map<string | null, Feed[]>();
	const remainingTags = Array.from(query.tags);
	for (const feed of query.feeds) {
		if (feed !== null) {
			const tag = feed.tagId ?? null;

			const feeds = m.has(tag) ? m.get(tag)! : [];

			feeds?.push(feed);

			m.set(tag, feeds);

			const tagIndex = remainingTags.findIndex((_tag) => _tag?.id === tag);

			if (tagIndex > -1) {
				remainingTags.splice(tagIndex, 1);
			}
		}
	}

	const _: [string | null, Feed[]][] = [];
	const untaggedFeeds: [null, Feed[]] = [null, []];
	for (const [key, value] of m) {
		if (key === null) {
			untaggedFeeds[1] = value;
		} else {
			_.push([key, value]);
		}
	}

	const emptyTags: [string | null, Feed[]][] = remainingTags.map((t) => [t?.id!, []]);

	_.push(...emptyTags, untaggedFeeds);

	return _;
}

export function createFakeFeeds(count: number, tagCount: number): TagsToMap {
	let userId = createWeakUID();
	const int = Math.floor(Math.random() * 100);
	const tags: Tag[] = Array.from({ length: tagCount }, (_, i) => ({
		id: `${i}`,
		title: `Tag #${i}`,
		userId,
	}));

	const feeds: Feed[] = Array.from({ length: count }, (_, i) => {
		let tag: string | null = null;

		if (int % i !== 0) {
			tag = tags[Math.floor(Math.random() * tags.length)].id;
		}

		let mockFeed: Feed = {
			id: `${i}`,
			title: `Test Feed #${i}`,
			feedURL: "https://example.com",
			link: "",
			tagId: tag,
			lastFetched: new Date(),
			userId,
		};

		return mockFeed;
	});
	return {
		feeds,
		tags,
	};
}

export function getFeedCount(value: ReturnType<typeof mapTagsToFeed>): number {
	return value.reduce((acc, [, feeds]) => {
		return acc + feeds.length;
	}, 0);
}
