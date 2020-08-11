import { Pool } from 'pg';

const pool = new Pool({
  user: 'pollo',
  host: 'localhost',
  database: 'demo',
  password: 'pollo',
  port: 5432,
});

type QueryData = {
  rows: Array<any>,
  count: number,
}

export async function query(sql: string, params: any = []): Promise<QueryData> {
  const res = await pool.query(sql, params);
  return {
    rows: res.rows,
    count: res.rowCount,
  };
}

async function createSchema() {
  // TODO(DAN): books structure
  const data = query(`
    CREATE TABLE books
  `);
  console.log(data);
}