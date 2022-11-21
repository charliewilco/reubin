/**
 * @jest-environment node
 */

import { server } from "../src/app";
import gql from "graphql-tag";
import base64 from "base-64";
import cuid from "cuid";

let authToken: string | null = null;
let currentFeed: string | null = null;
let currentTag: string | null = null;

const newUser = {
	email: `test-${cuid()}@charlieisamazing.com`,
	password: base64.encode("P@ssw0rd"),
};

describe("GraphQL Server", () => {
	beforeAll(() => {
		console.log("Using the following credentials:\n", JSON.stringify(newUser, null, 2));
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
			variables: newUser,
		});

		if (result.body.kind === "single") {
			authToken = result.body.singleResult.data?.createUser?.token;
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
						}
					}
				`,
				variables: {
					url: "https://www.inputmag.com/rss",
				},
			},
			{
				contextValue: {
					token: authToken,
				},
			}
		);

		if (feedResult.body.kind !== "single") {
			throw new Error("feedResult.body.kind is not single");
		}

		expect(feedResult.body.singleResult.data.addFeed.title).toEqual("Input");

		currentFeed = feedResult.body.singleResult.data.addFeed.id;
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
				id: currentFeed,
			},
		});

		if (entryListResult.body.kind !== "single") {
			throw new Error("entryListResult.body.kind is not single");
		}

		expect(entryListResult.body.singleResult.data?.entries?.length).toBeGreaterThan(1);
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
					token: authToken,
				},
			}
		);

		if (feedListResult.body.kind !== "single") {
			throw new Error("feedListResult.body.kind is not single");
		}

		expect(feedListResult.body.singleResult.data?.feeds?.length).toEqual(1);

		const feeds = feedListResult.body.singleResult.data?.feeds.map((f: any) => f.feedURL);
		expect(feeds).not.toContain("https://filecoin.io/blog/feed/index.xml");
		expect(feeds).toContain("https://www.inverse.com/input/rss");
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
					token: authToken,
				},
			}
		);

		if (result.body.kind !== "single") {
			throw new Error("result.body.kind is not single");
		}

		currentTag = result.body.singleResult.data.addTag.id;
		expect(result.body.singleResult.data.addTag.title).toEqual("Test Tag");
		expect(currentTag).not.toBeNull();
	});

	test.todo("can tag feeds");
	test.todo("can fetch feeds by tag");
	test.todo("can fetch feeds by tag and unread");
	test.todo("can remove tags");
	test.todo("removing tag does not remove feed");
	test.todo("can remove feed and all relevant entries");
	test.todo("can bookmark entries");
	test.todo("can fetch entries by bookmarked");
	test.todo("can mark entries as read");
	test.todo("can fetch entries by unread");
	test.todo("can refresh feeds");
});
