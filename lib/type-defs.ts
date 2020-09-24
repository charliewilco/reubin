import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Subscription {
    tags: [Tag]!
  }

  type Item {
    id: Int!
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
    unreadCount: Int!
    items: [Item]!
  }

  type AuthResponse {
    isValid: Boolean!
  }

  type Query {
    subscription: Subscription!
    unread: [Item!]!
  }

  type Mutation {
    bookmark(id: String!): String
    login(hash: String!): AuthResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
