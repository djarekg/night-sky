import type { SigninModel } from '@/auth/auth.model.js';
import authService from '@/auth/auth.service.js';
import type { ApiError } from '@/core/api/api-error.js';
import { ApiStatus } from '@/core/api/api-status.js';
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
  username: null | string;
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
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      setIsAuthenticated(true);
      setUsername(userName);
      return result;
    }

    setIsAuthenticated(false);
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

  const value = { username, isAuthenticated, signin, signout };

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
