import type { FeedDetailsFragment, TagInfoFragment, GetFeedsQuery } from "./__generated__";

export function mapTagsToFeed(query: GetFeedsQuery) {
	const m = new Map<string | null, FeedDetailsFragment[]>();
	const remainingTags = Array.from(query.tags);
	for (const feed of query.feeds) {
		if (feed !== null) {
			const tag = feed.tag ?? null;

			const feeds = m.has(tag) ? m.get(tag)! : [];

			feeds?.push(feed);

			m.set(tag, feeds);

			const tagIndex = remainingTags.findIndex((_tag) => _tag?.id === tag);

			if (tagIndex > -1) {
				remainingTags.splice(tagIndex, 1);
			}
		}
	}

	const _: [string | null, FeedDetailsFragment[]][] = [];
	const untaggedFeeds: [null, FeedDetailsFragment[]] = [null, []];
	for (const [key, value] of m) {
		if (key === null) {
			untaggedFeeds[1] = value;
		} else {
			_.push([key, value]);
		}
	}

	const emptyTags: [string | null, FeedDetailsFragment[]][] = remainingTags.map((t) => [
		t?.id!,
		[],
	]);

	_.push(...emptyTags, untaggedFeeds);

	return _;
}

export function createFakeFeeds(count: number, tagCount: number): GetFeedsQuery {
	const int = Math.floor(Math.random() * 100);
	const tags: TagInfoFragment[] = Array.from({ length: tagCount }, (_, i) => ({
		__typename: "Tag",
		id: `${i}`,
		title: `Tag #${i}`,
	}));

	const feeds: FeedDetailsFragment[] = Array.from({ length: count }, (_, i) => {
		let tag: string | null = null;

		if (int % i !== 0) {
			tag = tags[Math.floor(Math.random() * tags.length)].id;
		}

		return {
			__typename: "Feed",
			id: `${i}`,
			title: `Test Feed #${i}`,
			feedURL: "https://example.com",
			link: "",
			tag,
		};
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
