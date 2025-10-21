import { getSession } from '@/core/session/session.server.js';

export type AuthSession = {
  /**
   * True if user is authenticated.
   */
  isAuthenticated: boolean;
  /**
   * User's username.
   */
  username: string | null;
  /**
   * User's JWT token.
   */
  token: string | null;
};

/**
 * Get the current user authentication session.
 *
 * @param {Request} request HTTP request.
 * @returns {username, isAuthenticated} The username and isAuthenticated for the current session.
 */
export const getAuthSession = async (request: Request): Promise<Omit<AuthSession, 'token'>> => {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionString = await session.get('userId')!;
  const { token = null, username = null } = sessionString
    ? (JSON.parse(sessionString) as AuthSession)
    : {};
  return { username, isAuthenticated: !!token } as const;
};
