import { getUserIdForToken, getUserById } from "./user";

export async function context({ req }) {
  const { headers } = req;
  const origin = headers.origin;
  const userAgent = headers["user-agent"];
  const referrer = headers.referer;
  const authorization = parseToken(headers.authorization);
  const userId = await getUserIdForToken(authorization);
  const user = await getUserById(userId);
  return {
    origin,
    userAgent,
    referrer,
    user,
  };
}

function parseToken(authorization: string): string {
  if (!authorization) {
    return null;
  }
  return authorization.slice(7); // Bearer<space>
}
