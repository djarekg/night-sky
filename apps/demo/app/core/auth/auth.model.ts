import { type ApiStatus } from '@/core/api/api-status.js';

export type AuthModel = {
  /**
   * User's ID.
   */
  userId: string | null;
  /**
   * User's username.
   */
  username: string | null;
  /**
   * True is user is authenticated.
   */
  isAuthenticated: boolean;
};

export type SigninModel = {
  /**
   * User's ID.
   */
  userId?: string;
  /**
   * User's access role (i.e. USER).
   */
  // role?: string;
  /**
   * HTTP Status of sign-in request.
   */
  statusCode: ApiStatus;
};

export type SignoutModel = {
  /**
   * True if user successfully signed out from session. Otherwise false.
   */
  success: boolean;
};
