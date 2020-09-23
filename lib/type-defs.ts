import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Subscription {
    tags: [Tag]!
  }

  type Item {
    url: String!
    title: String!
    unread: Boolean!
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

  type Query {
    subscription: Subscription!
    unread: [Item!]!
  }

  type Mutation {
    bookmark(id: String!): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
