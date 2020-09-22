import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {

  }

  type Mutation {
    
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
