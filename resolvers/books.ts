import { query } from "../db";

export async function getBooks(
  _: any,
  args: { limit: number; offset?: number }
) {
  const limit = Math.min(Math.abs(args.limit), 10);
  const offset = args.offset;
  const data = await query(
    `
    SELECT name, author 
    FROM books 
    OFFSET $1
    LIMIT $2
  `,
    [offset, limit]
  );
  return data.rows;
}

export async function getAuthor(_: any, args: { author: string }) {
  const data = await query(
    `
    SELECT name, author
    FROM books 
    WHERE author = $1
    LIMIT 10
  `,
    [args.author]
  );
  return data.rows;
}

export async function addBook(_: any, args: { name: string; author: string }) {
  const data = await query(
    `
    INSERT INTO books(name, author)
    VALUES ($1, $2)
    RETURNING name, author
  `,
    [args.name, args.author]
  );
  return data.rows[0];
}

export async function deleteBook(_: any, args: { name: string }) {
  const data = await query(
    `
    DELETE FROM books
    WHERE name = $1
    RETURNING name, author
  `,
    [args.name]
  );
  return data.rows;
}
