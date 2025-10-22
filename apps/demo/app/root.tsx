import { getAuthSession } from '@/auth/auth-session.js';
import { AuthProvider } from '@/auth/auth.js';
import Footer from '@/components/layout/footer.js';
import Header from '@/components/layout/header.js';
import { unprotectedRoutes } from '@/routes.js';
import { darkTheme } from '@/styles/theme.js';
import { FluentProvider } from '@fluentui/react-components';
import {
  createSearchParams,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import type { Route } from './+types/root';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { isAuthenticated } = await getAuthSession(request);
  const { pathname } = new URL(request.url);

  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/signin` with a `from` parameter that allows signin to redirect back
  // to this page upon successful authentication.
  if (!isAuthenticated && !unprotectedRoutes.includes(pathname)) {
    const params = createSearchParams([['from', new URL(request.url).pathname]]);
    return redirect('/signin?' + params.toString());
  }

  return { isAuthenticated };
};

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/ghost.svg',
  },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: '/app/app.css',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
        {/* Add insertion point for Fluent UI styles before the </head>. */}
        <meta
          name="fluentui-insertion-point"
          content="fluentui-insertion-point"
        />
      </head>
      <body>
        <FluentProvider
          theme={darkTheme}
          className="app-root">
          <AuthProvider>
            {isAuthenticated && <Header />}
            <main className="app-main">{children}</main>
            <Footer />
          </AuthProvider>
        </FluentProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
