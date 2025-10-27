import type { Route } from '@/+types/root.js';
import { authContext } from '@/core/auth/auth-context.js';

export const authLoader = async ({ context }: Route.LoaderArgs) => {
  const auth = context.get(authContext);
  return auth;
};
