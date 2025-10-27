import { getSession } from '@/session.server.js';

export type AuthSession = {
  /**
   * True if user is authenticated.
   */
  isAuthenticated: boolean;
  /**
   * User's ID.
   */
  userId: string | null;
  /**
   * User's username.
   */
  username: string | null;
};

/**
 * Get the current user authentication session.
 *
 * @param {Request} request HTTP request.
 * @returns {AuthSession} The username and isAuthenticated for the current session.
 */
export const getAuthSession = async (request: Request): Promise<AuthSession> => {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionString = session.get('userId');
  const { userId = null, username = null } = sessionString
    ? (JSON.parse(sessionString) as AuthSession)
    : {};
  return { userId, username, isAuthenticated: !!userId } as const;
};
