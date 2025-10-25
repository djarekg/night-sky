import { destroySession, getSession } from '@/session.server.js';
import { redirect, type LoaderFunctionArgs } from 'react-router';

/**
 * This route handles user logout by destroying the session and redirecting to the signin page.
 * It does not render any UI, as its sole purpose is to handle the signout logic.
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/signin', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export default function Signout() {
  return null; // This component doesn't need to render anything.
}
