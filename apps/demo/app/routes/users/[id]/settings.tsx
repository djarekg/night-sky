import { authLoader } from '@/core/auth/auth-loader.js';
import authMiddleware from '@/core/auth/auth-middleware.js';

// Protect route with authentication
export const middleware = [authMiddleware];

export const loader = authLoader;

const UserSettings = () => {
  return <div>User Settings</div>;
};

export default UserSettings;
