import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Feed {
    id: ID!
    title: String!
    link: String!
  }

  type Activity {
    unread: [Int]!
    starred: [Int]!
  }

  type Entry {
    id: ID!
    feed_id: ID!
    title: String
    url: String
    """
    HTML String
    """
    content: String
    author: String
    published: Date
    created_at: Date
  }

  type Query {
    feeds: [Feed]!
    entry(id: String): Entry
    feed(id: ID!): Feed
    entries(feed_id: ID!): [Entry]!
  }

  type Mutation {
    addFeed(url: String!): Feed!
    updateFeed(id: ID!): Feed!
    removeFeed(id: ID!): Feed!
    refreshFeed(ids: [ID!]!): [Feed]!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
