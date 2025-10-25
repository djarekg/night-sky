import { ApiStatus } from '@/core/api/api-status.js';
import { getAuthSession } from '@/core/auth/auth-session.js';
import { useAuth } from '@/core/auth/auth.js';
import { isNullOrEmpty } from '@/core/utils/string.js';
import { commitSession, getSession } from '@/session.server.js';
import {
  Button,
  Field,
  Input,
  Link,
  makeStyles,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  tokens,
} from '@fluentui/react-components';
import { useCallback, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { redirect, useFetcher, type ActionFunctionArgs } from 'react-router';

const signinFailed: Record<number, string> = {
  400: 'The username and/or password are required',
  401: 'The username and/or password is not valid',
  404: 'The specified user was not found',
};

export const loader = async ({ request }: ActionFunctionArgs) => {
  const { isAuthenticated } = await getAuthSession(request);

  if (isAuthenticated) {
    return redirect('/');
  }

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Extract username from form data.
  const session = await getSession(request.headers.get('Cookie'));
  const formData = await request.formData();
  const userId = formData.get('userId')?.toString();
  const username = formData.get('username')?.toString();
  const token = formData.get('token')?.toString();

  // Store the user profile in the session.
  session.set(
    'userId',
    JSON.stringify({
      userId,
      username,
      token,
    })
  );

  // Login succeeded, send them to the home page.
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    inlineSize: '350px',
    marginBlock: 'auto',
    padding: '2rem',
    background: tokens.colorNeutralCardBackground,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    paddingBlock: tokens.spacingVerticalS,
  },
  message: {
    paddingBlock: tokens.spacingVerticalS,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    paddingBlock: tokens.spacingVerticalM,
  },
  createAccount: {
    paddingBlock: tokens.spacingVerticalS,

    '> .fui-Link': {
      marginInlineStart: '8px',
    },
  },
});

export default function Signin() {
  const classes = useStyles();
  const fetcher = useFetcher();
  const { signin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleEnterKey = useCallback(
    ({ key }: KeyboardEvent) => key === 'Enter' && handleSignin(),
    []
  );

  const handleSignin = useCallback(
    async (event?: MouseEvent) => {
      event?.preventDefault();

      setIsAuthenticating(true);

      // Extract username and password from FormData
      const formData = new FormData(formRef.current!);
      const username = formData.get('username')?.toString();
      const password = formData.get('password')?.toString();

      if (isNullOrEmpty(username) || isNullOrEmpty(password)) return;

      const { statusCode, userId, token } = await signin(username, password);

      // If user credentials are valid, store profile in session cookie
      if (statusCode === ApiStatus.ok) {
        setError(null);

        formData.append('userId', userId!);
        formData.append('token', token!);

        // Submit data to server so it can be added to the session cookie
        await fetcher.submit(formData, { method: 'post' });
      } else {
        setError(signinFailed[statusCode]);
        console.error(`\`${username}\` failed to sign-in`, statusCode);
      }

      setIsAuthenticating(false);
    },
    [isAuthenticating, error]
  );

  const renderError = useMemo(() => {
    return (
      <MessageBar
        intent="error"
        layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>Login failed</MessageBarTitle>
          {error}
        </MessageBarBody>
      </MessageBar>
    );
  }, [error]);

  return (
    <fetcher.Form
      ref={formRef}
      className={classes.form}>
      <header className={classes.header}>Login</header>

      <section className={classes.message}>{error && renderError}</section>

      <section className={classes.inputs}>
        <Field
          label="Username"
          required>
          <Input
            name="username"
            onKeyDown={handleEnterKey}
          />
        </Field>

        <Field
          required
          label="Password"
          hint={<Link href="/forgot-password">Forgot password?</Link>}>
          <Input
            name="password"
            type="password"
            autoComplete="off"
            onKeyDown={handleEnterKey}
          />
        </Field>
      </section>

      <footer className={classes.footer}>
        <Button
          appearance="primary"
          disabled={isAuthenticating}
          onClick={handleSignin}>
          Sign In
        </Button>

        <span className={classes.createAccount}>
          Don't have an account?
          <Link
            inline
            href="/signup">
            Create new
          </Link>
        </span>
      </footer>
    </fetcher.Form>
  );
}
