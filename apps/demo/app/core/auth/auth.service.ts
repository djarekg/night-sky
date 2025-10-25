import api from '@/core/api/api.js';
import { type SigninModel, type SignoutModel } from '@/core/auth/auth.model.js';

const authService = {
  /**
   * Sign in user by creating a session.
   *
   * @param {string} username User's username.
   * @param {string} password User's password.
   * @returns {SigninModel} Returns sign-in object with user properties.
   */
  signin: (username: string, password: string) => {
    const { post } = api();
    return post<SigninModel>('/auth/signin', { username, password });
  },

  /**
   * Sign out user from session.
   *
   * @returns {SignoutModel} Returns object with success property where true sign-out
   * was successful.
   */
  signout: () => {
    const { post } = api();
    return post<SignoutModel>('/auth/signout');
  },
};

export default authService;
