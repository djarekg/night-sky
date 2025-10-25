import { getSession } from '@/session.server.js';
import { type MiddlewareFunction, redirect } from 'react-router';

/**
 * Server-side authentication middleware.
 */
const authMiddleware: MiddlewareFunction = async ({ request }) => {
  const cookie = request.headers.get('Cookie');
  const session = await getSession(cookie);
  const userId = session.get('userId');

  if (!userId) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect('/signin');
  }
};

export default authMiddleware;
