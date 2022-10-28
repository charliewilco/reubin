/**
 * @jest-environment node
 */

import { createApp } from "../src/app";
import gql from "graphql-tag";
import base64 from "base-64";
import cuid from "cuid";
import { createMercuriusTestClient } from "mercurius-integration-testing";

let authToken: string | null = null;

describe("Integration", () => {
  const client = createMercuriusTestClient(createApp());

  const newUser = {
    email: `${cuid()}@charlieisamazing.com`,
    password: base64.encode("P@ssw0rd"),
  };

  beforeAll(() => {
    console.log("Using the following credentials:\n", JSON.stringify(newUser, null, 2));
  });

  test("can create users", async () => {
    const createUser = await client.query(
      gql`
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
      {
        variables: newUser,
      }
    );

    authToken = createUser.data.createUser.token;

    expect(createUser.data.createUser.token).not.toBeNull();
  });

  test("can create feeds", async () => {
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
        headers: {
          authorization: authToken ?? "",
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
