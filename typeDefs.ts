import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    name: String!
    author: String!
  }

  type User {
    id: String!
    username: String!
    token: String!
  }

  type Query {
    me: User
    books(limit: Int!, offset: Int): [Book]
    author(author: String!): [Book]
  }

  type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): User

    addBook(name: String!, author: String!): Book!
    deleteBook(name: String!): [Book]
  }
`;
