import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolver } from "./resolvers";

const typeDefs = gql`
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
    addFeed(url: String!): Feed
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolver,
});
