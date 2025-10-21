export type SigninModel = {
  /**
   * JWT token for user's session.
   */
  token: string;
  /**
   * User's ID.
   */
  userId: string;
  /**
   * User's access role (i.e. USER).
   */
  role: string;
};

export type SignoutModel = {
  /**
   * True if user successfully signed out from session. Otherwise false.
   */
  success: boolean;
};
