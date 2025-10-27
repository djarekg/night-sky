import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export const unprotectedRoutes = ['/signin', '/forgot-password'];

export default [
  index('routes/home.tsx'),
  route('signin', 'routes/auth/signin.tsx'),
  route('signout', 'routes/auth/signout.tsx'),
  route('signup', 'routes/auth/signup.tsx'),
  route('forgot-password', 'routes/auth/forgot-password.tsx'),
  ...prefix('users', [
    index('routes/users/users.tsx'),
    ...prefix(':id', [
      layout('routes/users/[id]/layout.tsx', [
        index('routes/users/[id]/user.tsx'),
        route('settings', 'routes/users/[id]/settings.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
