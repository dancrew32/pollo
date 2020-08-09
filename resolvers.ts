import { query } from './db';

export const resolvers = {
  Query: {
    getBooks,
    getAuthor,
  },
  Mutation: {
    addBook,
  }
};

async function getBooks(_parent: any, args: { limit: number; offset?: number; }) {
  const limit = Math.min(Math.abs(args.limit), 10);
  const offset = args.offset;
  const data = await query(`
    SELECT name, author 
    FROM books 
    OFFSET $1
    LIMIT $2
  `, [offset, limit]);
  return data.rows;
}

async function getAuthor(_parent: any, args: { author: string; }) {
  const data = await query(`
    SELECT name
    FROM books 
    WHERE author = $1
    LIMIT 10
  `, [args.author]);
  return data.rows;
}

async function addBook(_parent, args: {name: string; author: string;}) {
  const data = await query(`
    INSERT INTO books(name, author)
    VALUES ($1, $2)
    RETURNING name, author
  `, [args.name, args.author]);
  return data.rows[0];
}