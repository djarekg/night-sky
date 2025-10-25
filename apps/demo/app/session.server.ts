import { createCookieSessionStorage } from 'react-router';

/**
 * Creates a session storage for user authentication.
 * This storage will handle user sessions, including getting, committing, and destroying sessions.
 */
export const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  { userId: string },
  { error: string }
>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__session',

    // all of these are optional
    // domain: 'localhost:3006',
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    // expires: new Date(Date.now() + 60_000),
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    sameSite: 'lax',
    secrets: ['this-a_bogus=secret+key'],
    secure: true,
  },
});
