import UserDetail from '@/components/user/user-detail.js';
import { authLoader } from '@/core/auth/auth-loader.js';
import authMiddleware from '@/core/auth/auth-middleware.js';
import type { UserModel } from '@ns/api';
import { useOutletContext } from 'react-router';

// Protect route with authentication
export const middleware = [authMiddleware];

export const loader = authLoader;

export default function User() {
  const { user } = useOutletContext<{ user: UserModel }>();

  return <UserDetail user={user} />;
}
