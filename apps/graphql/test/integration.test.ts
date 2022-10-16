/**
 * @jest-environment node
 */

import { createApp } from "../src/app";
import gql from "graphql-tag";

import { createMercuriusTestClient } from "mercurius-integration-testing";

describe("Integration", () => {
  const client = createMercuriusTestClient(createApp());

  it("can create feeds", async () => {
    const createFeed = await client.query(
      gql`
        mutation CreateFeed($url: String!) {
          addFeed(url: $url) {
            id
            title
          }
        }
      `,
      {
        variables: {
          url: "https://www.inputmag.com/rss",
        },
      }
    );

    expect(createFeed.data.addFeed.title).toEqual("Input");

    const entryList = await client.query(
      gql`
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
      {
        variables: {
          id: createFeed.data.addFeed.id,
        },
      }
    );

    expect(entryList.data.entries.length).toBeGreaterThan(1);
  });
});
