import { type ApiStatus } from '@/core/api/api-status.js';

export type SigninModel = {
  /**
   * JWT token for user's session.
   */
  token?: string;
  /**
   * User's ID.
   */
  userId?: string;
  /**
   * User's access role (i.e. USER).
   */
  role?: string;
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
