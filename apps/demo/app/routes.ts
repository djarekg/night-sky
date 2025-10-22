import { index, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export const unprotectedRoutes = ['/signin', '/forgot-password'];

export default [
  index('routes/home.tsx'),
  route('signin', 'routes/auth/signin.tsx'),
  route('signout', 'routes/auth/signout.tsx'),
  route('signup', 'routes/auth/signup.tsx'),
  route('forgot-password', 'routes/auth/forgot-password.tsx'),
  ...prefix('users', [
    index('routes/users/index.tsx'),
    ...prefix(':id', [index('routes/users/[id]/index.tsx')]),
  ]),
] satisfies RouteConfig;
