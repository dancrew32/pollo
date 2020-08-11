import { register, login } from "./auth";
import { getBooks, getAuthor, addBook, deleteBook } from "./books";

export const resolvers = {
  Query: {
    // book
    books: getBooks,
    author: getAuthor,
  },
  Mutation: {
    // auth
    register,
    login,

    // book
    addBook,
    deleteBook,
  },
};
