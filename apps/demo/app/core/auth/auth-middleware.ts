import { type MiddlewareFunction, redirect } from 'react-router';
import { getAuthSession } from './auth-session.js';
import { authContext } from './auth-context.js';

/**
 * Middleware function for authentication. If user is not authenticated
 * then redirect `signin`.
 */
const authMiddleware: MiddlewareFunction = async ({ request, context }) => {
  const { userId, username, isAuthenticated } = await getAuthSession(request);

  if (!userId || !username || !isAuthenticated) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect('/signin');
  }

  context.set(authContext, { userId, username, isAuthenticated });
};

export default authMiddleware;
