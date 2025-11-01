import type { ApiError } from '@/core/api/api-error.js';
import { ApiStatus } from '@/core/api/api-status.js';
import type { AuthModel, SigninModel } from '@/core/auth/auth.model.js';
import authService from '@/core/auth/auth.service.js';
import safeSessionStorage from '@/core/utils/session-storage.js';
import { isNullOrEmpty } from '@/core/utils/string.js';
import { createContext, use, useState, type ReactNode } from 'react';

type AuthProvider = {
  /**
   * True if user is authenticated.
   */
  isAuthenticated: boolean;
  /**
   * User's username.
   */
  username: string | null;
  /**
   * User's ID.
   */
  userId: string | null;
  /**
   * Verify credentials.
   */
  signin(username: string, password: string): Promise<SigninModel>;
  /**
   * Sign-out user by clearing session cookies.
   */
  signout(): Promise<boolean>;
};

/**
 * AuthProvider component that provides authentication state and methods
 * to its children components.
 *
 * @param {React.ReactNode} children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} The AuthContext provider wrapping the children.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = JSON.parse(safeSessionStorage.getItem('auth')! ?? null) as AuthModel;
  const [userId, setUserId] = useState<string | null>(auth?.userId ?? null);
  const [username, setUsername] = useState<string | null>(auth?.username ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(auth?.isAuthenticated ?? false);

  const setStore = (auth: AuthModel | null) => {
    if (auth) {
      safeSessionStorage.setItem('auth', JSON.stringify(auth));
    } else {
      safeSessionStorage.removeItem('auth');
    }
  };

  /**
   * Sign-in user and obtain JWT token.
   */
  const signin = async (userName: string, password: string): Promise<SigninModel> => {
    if (isNullOrEmpty(userName) || isNullOrEmpty(password)) {
      return { statusCode: ApiStatus.badRequest };
    }

    let result = {} as SigninModel;

    try {
      result = await authService.signin(userName, password);
      result.statusCode = ApiStatus.ok;
    } catch (err: unknown) {
      switch ((err as ApiError).status) {
        case 401:
          result.statusCode = ApiStatus.unauthorized;
          break;
        case 404:
          result.statusCode = ApiStatus.notFound;
          break;
      }
    }

    if (result.statusCode === ApiStatus.ok) {
      setStore({ userId: result.userId!, username: userName, isAuthenticated: true });
      setIsAuthenticated(true);
      setUserId(result.userId!);
      setUsername(userName);
      return result;
    }

    setStore(null);
    setIsAuthenticated(false);
    setUserId(null);
    setUsername(null);
    return result;
  };

  /**
   * Sign out user and reset state.
   */
  const signout = async () => {
    const result = await authService.signout();

    if (result?.success) {
      setIsAuthenticated(false);
      setUsername(null);
      return true;
    }

    return false;
  };

  const value = { userId, username, isAuthenticated, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Context for authentication state and methods.
 * This context provides access to the authentication state and methods
 * for signing in and signing out.
 */
const AuthContext = createContext<AuthProvider>({} as AuthProvider);

/**
 * Custom hook to access the authentication context.
 * This hook provides access to the authentication state and methods.`
 * It should be used within a component that is wrapped in the AuthProvider.
 *
 * @returns {AuthProvider} The authentication context value.
 */
export const useAuth = () => use(AuthContext);
