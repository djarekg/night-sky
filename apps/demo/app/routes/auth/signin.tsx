import { getAuthSession } from '@/auth/auth-session.js';
import { useAuth } from '@/auth/auth.js';
import { commitSession, getSession } from '@/core/session/session.server.js';
import { isNullOrEmpty } from '@/core/utils/string.js';
import { Button, Field, Input } from '@fluentui/react-components';
import { useCallback, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import {
  redirect,
  useFetcher,
  useLocation,
  useNavigate,
  type ActionFunctionArgs,
} from 'react-router';

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

export default function Signin() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { signin } = useAuth();
  const { state: locationState } = useLocation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [username]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [password]
  );

  const handleSigninClick = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      if (isNullOrEmpty(username) || isNullOrEmpty(password)) return;

      const result = await signin(username, password);

      // If user credentials are valid, store profile in session cookie
      if (result) {
        const formData = new FormData(formRef.current!);
        formData.append('userId', result.userId);
        formData.append('token', result.token);

        // Submit data to server so it can be added to the session cookie
        fetcher.submit(formData, { method: 'post' });

        // Redirect to the home page or the original page the user was trying to navigate too
        navigate(locationState.from || '/', { replace: true, viewTransition: true });
      } else {
        console.error(`\`${username}\` failed to sign-in`);
      }
    },
    [username, password]
  );

  return (
    <fetcher.Form ref={formRef}>
      <h2>Login</h2>

      <Field
        label="Username"
        validationState="error"
        validationMessage="Username is required"
        required>
        <Input
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </Field>

      <Field
        label="Password"
        validationState="error"
        validationMessage="Password is required"
        required>
        <Input
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSigninClick}>
        Sign In
      </Button>
    </fetcher.Form>
  );
}
