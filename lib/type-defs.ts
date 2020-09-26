import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type UnreadList {
    itemIDs: [String!]!
  }

  type Subscriptions {
    tags: [Tag!]!
    untaggedFeeds: [Feed!]!
  }

  type Item {
    id: Float!
    feed_id: Int!
    title: String!
    author: String
    summary: String!
    content: String!
    url: String!
    extracted_content_url: String!
    published: String!
    created_at: String
  }

  type Tag {
    title: String!
    feeds: [Feed]!
  }

  type Feed {
    url: String!
    site: String!
    name: String!
    id: ID!
  }

  type AuthResponse {
    isValid: Boolean!
  }

  type Query {
    subscriptions: Subscriptions!
    unread: UnreadList!
    entries(page: Int): [Item!]!
  }

  type Mutation {
    # bookmark(id: String!): Item
    # markAsRead(id: String!): Item
    login(hash: String!): AuthResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
