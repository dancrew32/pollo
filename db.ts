import { Pool } from 'pg';

const pool = new Pool({
  user: 'pollo',
  host: 'localhost',
  database: 'demo',
  password: 'pollo',
  port: 5432,
});

export async function query(sql: string, params: any) {
  const res = await pool.query(sql, params);
  return {
    rows: res.rows,
    count: res.rowCount,
  };
}