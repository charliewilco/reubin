/**
 * @jest-environment node
 */

import { createServer } from "@graphql-yoga/common";
import { schema } from "../server/schema";
import { context } from "../server/context";
import gql from "graphql-tag";

describe("Integration", () => {
	const yoga = createServer({
		schema: schema,
		context: () => context,
	});

	it("can create feeds", async () => {
		const createFeed = await yoga.inject({
			document: gql`
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
		});

		expect(createFeed.executionResult?.data.addFeed.title).toEqual("Input");

		const entryList = await yoga.inject({
			document: gql`
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
				id: createFeed.executionResult?.data.addFeed.id,
			},
		});

		expect(entryList.executionResult?.data.entries.length).toBeGreaterThan(1);
	});
});
