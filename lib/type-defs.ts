import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type UnreadList {
    itemIDs: [String!]!
  }

  type Subscriptions {
    tags: [Tag!]!
    untaggedFeeds: [Feed!]!
  }

  enum Services {
    RSS
    INSTAPAPER
    FEEDBIN
  }

  type Item {
    id: String!
    feed_id: Int!
    title: String!
    author: String
    summary: String
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
    feed_id: Float!
  }

  type AuthResponse {
    isValid: Boolean!
  }

  type Subscription {
    feed: Feed!
    items: [Item!]!
  }

  type Query {
    subscriptions: Subscriptions!
    favorites: [Float!]!
    unread: [Float!]!
    entries(page: Int): [Item!]!
    entry(id: Float!): Item!
    """
    Deprecated
    """
    subscription(id: Float!): Subscription!
    bookmarks(ids: [Float!]): [Item!]!
    """
    Must be id not feed_id
    """
    feed(id: Float!): Feed!
    product(service: Services!, url: String!): [Item!]!
  }

  type Mutation {
    bookmark(id: Float!): Item
    removeBookmark(id: Float!): Item
    markAsRead(id: String!): Item
    markAsUnread(id: String!): Item
    login(hash: String!): AuthResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
