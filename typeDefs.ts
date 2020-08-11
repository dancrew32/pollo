import { gql } from 'apollo-server';

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
    getBooks(limit: Int!, offset: Int): [Book]
    getAuthor(author: String!): [Book]
  }

  type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): User

    addBook(name: String!, author: String!): Book!
    deleteBook(name: String!): [Book]
  }
`;
