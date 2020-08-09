import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Book {
    name: String
    author: String
  }

  type Query {
    getBooks(offset: Int, limit: Int): [Book],
    getAuthor(author: String): [Book],
  }

  type Mutation {
    addBook(name: String, author: String): Book,
  }
`;
