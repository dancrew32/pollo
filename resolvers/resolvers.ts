import { register, login } from "./auth";
import { getBooks, getAuthor, addBook, deleteBook } from "./books";
import { UserType } from "../user";

export async function me(_: any, __: any, context: { user: UserType }) {
  return context.user;
}

export const resolvers = {
  Query: {
    me,

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
