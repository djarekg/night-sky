import UserSettingsDetail from '@/components/user/user-settings-detail.js';
import { authLoader } from '@/core/auth/auth-loader.js';
import authMiddleware from '@/core/auth/auth-middleware.js';
import type { UserModel } from '@ns/api';
import { useOutletContext } from 'react-router';

// Protect route with authentication
export const middleware = [authMiddleware];

export const loader = authLoader;

const UserSettings = () => {
  const { user } = useOutletContext<{ user: UserModel }>();

  return <UserSettingsDetail user={user} />;
};

export default UserSettings;
