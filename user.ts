import { readFileSync } from "fs";

import { hash as bcryptHash, compare as bcryptCompare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sign, verify, JsonWebTokenError } from "jsonwebtoken";
import { query } from "./db";

const privateKey = readFileSync("private.key");
const SALT_ROUNDS = 10;

export type UserType = {
  id: string;
  username: string;
  token?: string;
};

export async function makeTokenForUserId(id: string) {
  const data = {
    id,
    // exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    // exp: Math.floor(Date.now() / 1000), // quickly expire
  };
  return sign(data, privateKey);
}

export async function getUserIdForToken(token: string) {
  if (!token) {
    return null;
  }
  try {
    const decoded = await verify(token, privateKey);
    return decoded.id;
  } catch (ex) {
    if (ex instanceof JsonWebTokenError) {
      return null;
    }
    console.error(ex); // TODO(DAN): handle weird error
    return null;
  }
}

async function hashPassword(password: string) {
  return await bcryptHash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  passwordHashed: string
): Promise<boolean> {
  return await bcryptCompare(password, passwordHashed);
}

export async function createUser(username: string, password: string) {
  const id = uuidv4();
  const usernameTrimmed = username.trim();
  const passwordHashed = await hashPassword(password);
  return {
    id,
    usernameTrimmed,
    passwordHashed,
  };
}

export async function getUserById(
  id: string,
  token?: string
): Promise<UserType> {
  if (!id) {
    return null;
  }
  const data = await query(
    `
    SELECT id, username
    FROM users
    WHERE id = $1
    LIMIT 1
  `,
    [id]
  );
  const userData = data.rows[0];
  return {
    id: userData.id,
    username: userData.username,
    token,
  };
}
