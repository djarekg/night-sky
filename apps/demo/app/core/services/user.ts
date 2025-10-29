import api from '@/core/api/api.js';
import type { UserModel } from '@ns/api';

export const userService = {
  /**
   * Fetch user from API.
   *
   * @param {string} id User ID of user to fetch.
   * @returns {UserModel} User object.
   */
  getUser: (id: string) => {
    const { get } = api();
    return get<UserModel>(`/users/${id}`);
  },
};
