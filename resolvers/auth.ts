import { query } from '../db';
import { createUser, comparePassword } from '../user';
import {UserType} from '../user';

export async function register(_: any, args: { username: string; password: string; }): Promise<UserType>   {
  const user = await createUser(args.username, args.password);
  const count = await query(`
    SELECT EXISTS(
      SELECT 1
      FROM users
      WHERE LOWER(username) = $1
    ) AS exists
  `, [user.usernameTrimmed.toLowerCase()]);
  const exists = count.rows[0].exists;
  if (exists) {
    // TODO(DAN): Username taken error
    return null;
  }

  const data = await query(`
    INSERT INTO users(id, username, password)
    VALUES ($1, $2, $3)
    RETURNING id, username
  `, [user.id, user.usernameTrimmed, user.passwordHashed]);
  return data.rows[0];
}

export async function login(_: any, args: { username: string; password: string; }): Promise<UserType>   {
  const usernameTrimmed = args.username.trim().toLowerCase();
  const data = await query(`
    SELECT id, username, password
    FROM users
    WHERE LOWER(username) = $1
  `, [usernameTrimmed]);
  if (data.count !== 1) {
    // TODO(DAN): generic login error bad username or password
    return null;
  }
  const userData = data.rows[0];
  const passwordMatches = await comparePassword(args.password, userData.password);
  if (!passwordMatches) {
    // TODO(DAN): generic login error bad username or password
    return null;
  }
  return {
    id: userData.id,
    username: userData.username,
  };
}