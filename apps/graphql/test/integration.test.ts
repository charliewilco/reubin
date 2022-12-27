/**
 * @jest-environment node
 */

import { server } from "../src/app";
import gql from "graphql-tag";
import isAfter from "date-fns/isAfter";
import { TestingMocks } from "./fixtures/mocks";

const mocks = new TestingMocks();

describe("GraphQL Server", () => {
	beforeAll(() => {
		console.log("Using the following credentials:\n", JSON.stringify(mocks.user, null, 2));
	});

	test("can create users", async () => {
		const result = await server.executeOperation<any>({
			query: gql`
				mutation Register($email: String!, $password: String!) {
					createUser(email: $email, password: $password) {
						token
						user {
							id
							email
						}
					}
				}
			`,
			variables: mocks.user,
		});

		if (result.body.kind === "single") {
			mocks.authToken = result.body.singleResult.data?.createUser?.token;
			const { data } = result.body.singleResult;
			expect(data.createUser.token).not.toBeNull();
			expect(data.createUser.user.email).not.toBeNull();
			expect(data.createUser.user.email).toContain("@charlieisamazing.com");
		} else {
			throw new Error("result.body.kind is not single");
		}
	});

	test("can create feeds", async () => {
		const feedResult = await server.executeOperation<any>(
			{
				query: gql`
					mutation CreateFeed($url: String!) {
						addFeed(url: $url) {
							id
							title
							lastFetched
						}
					}
				`,
				variables: {
					url: "https://discord.com/blog/rss.xml",
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (feedResult.body.kind !== "single") {
			throw new Error("feedResult.body.kind is not single");
		}

		expect(feedResult.body.singleResult.data.addFeed.title).toEqual("Discord Blog");
		mocks.lastFetched = feedResult.body.singleResult.data.addFeed.lastFetched;
		mocks.currentFeed = feedResult.body.singleResult.data.addFeed.id;
	});

	test("feeds can create entries", async () => {
		/// Technically this should fail because this operation isn't authenticated
		/// but it's not failing because of the current implementation of the
		/// feed controller. This is a bug that needs to be fixed.
		const entryListResult = await server.executeOperation<any>({
			query: gql`
				query EntriesByFeed($id: ID!) {
					entries(feed_id: $id) {
						title
						content
						id
						unread
						published
					}
				}
			`,
			variables: {
				id: mocks.currentFeed,
			},
		});

		if (entryListResult.body.kind !== "single") {
			throw new Error("entryListResult.body.kind is not single");
		}

		expect(entryListResult.body.singleResult.data?.entries?.length).toBeGreaterThan(1);
		expect(entryListResult.body.singleResult.data?.entries[0].title).not.toBeNull();
		mocks.currentEntry = entryListResult.body.singleResult.data?.entries[0].id;
		mocks.entryCount = entryListResult.body.singleResult.data?.entries.length;
	});

	test("cannot fetch feeds user did not create", async () => {
		await prisma?.feed.create({
			data: {
				title: "Filecoin",
				feedURL: "https://filecoin.io/blog/feed/index.xml",
				link: "https://filecoin.io/",
			},
		});

		const feedListResult = await server.executeOperation<any>(
			{
				query: gql`
					query GetFeeds {
						feeds {
							id
							title
							link
							feedURL
						}
					}
				`,
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (feedListResult.body.kind !== "single") {
			throw new Error("feedListResult.body.kind is not single");
		}

		expect(feedListResult.body.singleResult.data?.feeds?.length).toEqual(1);

		const feeds = feedListResult.body.singleResult.data?.feeds.map((f: any) => f.feedURL);
		expect(feeds).not.toContain("https://filecoin.io/blog/feed/index.xml");
		expect(feeds).toContain("https://discord.com/blog/rss.xml");
	});

	test("can create tags", async () => {
		const result = await server.executeOperation<any>(
			{
				query: gql`
					mutation CreateTag($name: String!) {
						addTag(name: $name) {
							id
							title
						}
					}
				`,
				variables: {
					name: "Test Tag",
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (result.body.kind !== "single") {
			throw new Error("result.body.kind is not single");
		}

		mocks.currentTag = result.body.singleResult.data.addTag.id;
		expect(result.body.singleResult.data.addTag.title).toEqual("Test Tag");
		expect(mocks.currentTag).not.toBeNull();
	});

	test("can tag feeds", async () => {
		const result = await server.executeOperation<any>(
			{
				query: gql`
					fragment FeedDetails on Feed {
						id
						title
						link
						feedURL
						tag
					}

					mutation UpdateFeedTitle($input: UpdateFeedInput, $id: ID!) {
						updateFeed(id: $id, fields: $input) {
							...FeedDetails
						}
					}
				`,
				variables: {
					input: {
						tagID: mocks.currentTag,
					},
					id: mocks.currentFeed,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (result.body.kind !== "single") {
			throw new Error("result.body.kind is not single");
		}

		expect(mocks.currentTag).not.toBeNull();
		expect(result.body.singleResult.data.updateFeed.tag).toEqual(mocks.currentTag);
	});

	test("can fetch feeds by tag", async () => {
		const result = await server.executeOperation<any>(
			{
				query: gql`
					query GetFeedsByTag($id: ID!) {
						feeds(tag_id: $id) {
							id
							title
							link
							feedURL
							tag
						}
					}
				`,
				variables: {
					id: mocks.currentTag,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (result.body.kind !== "single") {
			throw new Error("result.body.kind is not single");
		}

		expect(result.body.singleResult.data?.feeds?.length).toEqual(1);
		expect(result.body.singleResult.data?.feeds[0].tag).toEqual(mocks.currentTag);
	});

	test("can remove tags", async () => {
		const result = await server.executeOperation<any>(
			{
				query: gql`
					mutation RemoveTag($id: ID!) {
						removeTag(id: $id) {
							id
							title
						}
					}
				`,
				variables: {
					id: mocks.currentTag,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (result.body.kind !== "single") {
			throw new Error("result.body.kind is not single");
		}

		expect(result.body.singleResult.data.removeTag.id).toEqual(mocks.currentTag);

		const tagResult = await server.executeOperation<any>(
			{
				query: gql`
					query AllTags {
						tags {
							id
							title
						}
					}
				`,
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (tagResult.body.kind !== "single") {
			throw new Error("tagResult.body.kind is not single");
		}

		expect(tagResult.body.singleResult.data?.tags?.length).toEqual(0);
	});

	test("removing tag does not remove feed", async () => {
		const feedResult = await server.executeOperation<any>(
			{
				query: gql`
					query AllFeeds {
						feeds {
							id
							title
							link
							feedURL
							tag
						}
					}
				`,
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (feedResult.body.kind !== "single") {
			throw new Error("feedResult.body.kind is not single");
		}

		expect(feedResult.body.singleResult.data?.feeds?.length).toEqual(1);
		expect(feedResult.body.singleResult.data?.feeds[0].tag).not.toEqual(mocks.currentTag);
	});

	test("can bookmark entries", async () => {
		const bookmarkResult = await server.executeOperation<any>(
			{
				query: gql`
					mutation MarkAsFavorite($id: ID!) {
						markAsFavorite(id: $id, favorite: true) {
							id
						}
					}
				`,
				variables: {
					id: mocks.currentEntry,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (bookmarkResult.body.kind !== "single") {
			throw new Error("bookmarkResult.body.kind is not single");
		}

		expect(bookmarkResult.body.singleResult.data.markAsFavorite.id).toEqual(
			mocks.currentEntry
		);
	});

	test("can fetch entries by bookmarked", async () => {
		const bookmarkedResult = await server.executeOperation<any>(
			{
				query: gql`
					query FavoriteEntries($feedID: ID!) {
						entries(feed_id: $feedID, filter: FAVORITED) {
							title
							content
							id
							unread
							published
							favorite
						}
					}
				`,
				variables: {
					feedID: mocks.currentFeed,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (bookmarkedResult.body.kind !== "single") {
			throw new Error("bookmarkedResult.body.kind is not single");
		}

		expect(bookmarkedResult.body.singleResult.data?.entries?.length).toEqual(1);
		expect(bookmarkedResult.body.singleResult.data?.entries[0].id).toEqual(mocks.currentEntry);
		expect(bookmarkedResult.body.singleResult.data?.entries[0].favorite).toEqual(true);
		expect(bookmarkedResult.body.singleResult.data?.entries[0].unread).toEqual(true);
	});

	test("can mark entries as read", async () => {
		const unreadResult = await server.executeOperation<any>(
			{
				query: gql`
					mutation MarkAsRead($id: ID!) {
						markAsRead(id: $id) {
							id
						}
					}
				`,
				variables: {
					id: mocks.currentEntry,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (unreadResult.body.kind !== "single") {
			throw new Error("unreadResult.body.kind is not single");
		}

		expect(unreadResult.body.singleResult.data.markAsRead.id).toEqual(mocks.currentEntry);
	});

	test("can fetch entries by unread", async () => {
		const unreadResult = await server.executeOperation<any>(
			{
				query: gql`
					query UnreadEntries($feedID: ID!) {
						entries(feed_id: $feedID, filter: UNREAD) {
							title
							content
							id
							unread
							published
							favorite
						}
					}
				`,
				variables: {
					feedID: mocks.currentFeed,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (unreadResult.body.kind !== "single") {
			throw new Error("unreadResult.body.kind is not single");
		}

		expect(unreadResult.body.singleResult.data?.entries?.length).toEqual(mocks.entryCount - 1);
		expect(unreadResult.body.singleResult.data?.entries[0].id).not.toEqual(mocks.currentEntry);
		expect(unreadResult.body.singleResult.data?.entries[0].unread).toEqual(true);
	});

	test("can refresh feeds", async () => {
		const refreshResult = await server.executeOperation<any>(
			{
				query: gql`
					mutation RefreshFeeds($id: ID!) {
						refreshFeed(id: $id) {
							id
						}
					}
				`,
				variables: {
					id: mocks.currentFeed,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (refreshResult.body.kind !== "single") {
			throw new Error("refreshResult.body.kind is not single");
		}

		expect(refreshResult.body.singleResult.data.refreshFeed.length).toBeGreaterThanOrEqual(0);

		const feedResult = await server.executeOperation<any>(
			{
				query: gql`
					query Feed($id: ID!) {
						feed(id: $id) {
							id
							title
							lastFetched
						}
					}
				`,
				variables: {
					id: mocks.currentFeed,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (feedResult.body.kind !== "single") {
			throw new Error("feedResult.body.kind is not single");
		}

		expect(feedResult.body.singleResult.data.feed.id).toEqual(mocks.currentFeed);
		expect(
			isAfter(feedResult.body.singleResult.data.feed.lastFetched, mocks.lastFetched)
		).toEqual(true);
	});

	test("can remove feed and all relevant entries", async () => {
		const removedFeed = await server.executeOperation<any>(
			{
				query: gql`
					mutation RemoveFeed($id: ID!) {
						removeFeed(id: $id) {
							id
						}
					}
				`,
				variables: {
					id: mocks.currentFeed,
				},
			},
			{
				contextValue: {
					token: mocks.authToken,
				},
			}
		);

		if (removedFeed.body.kind !== "single") {
			throw new Error("removedFeed.body.kind is not single");
		}

		expect(removedFeed.body.singleResult.data.removeFeed.id).toEqual(mocks.currentFeed);

		const entryListResult = await server.executeOperation<any>({
			query: gql`
				query EntriesByFeed($id: ID!) {
					entries(feed_id: $id) {
						title
						content
						id
						unread
						published
					}
				}
			`,
			variables: {
				id: mocks.currentFeed,
			},
		});

		if (entryListResult.body.kind !== "single") {
			throw new Error("entryListResult.body.kind is not single");
		}

		expect(entryListResult.body.singleResult.data.entries.length).toEqual(0);
	});
});
