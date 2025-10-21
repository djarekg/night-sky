import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('signin', 'routes/auth/signin.tsx'),
  route('signout', 'routes/auth/signout.tsx'),
  ...prefix('users', [
    index('routes/users/index.tsx'),
    ...prefix(':id', [index('routes/users/[id]/index.tsx')]),
  ]),
] satisfies RouteConfig;
