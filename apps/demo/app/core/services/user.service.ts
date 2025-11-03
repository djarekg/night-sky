import api from '@/core/api/api.js';
import type { UserModel } from '@ns/api';

/**
 * Fetch user from API.
 *
 * @param {string} id User ID of user to fetch.
 * @returns {UserModel} User object.
 */
export const getUser = (id: string) => {
  const { get } = api();
  return get<UserModel>(`/users/${id}`);
};

/**
 * Update user active status.
 *
 * @param {string} id User ID of user to update.
 * @param {boolean} isActive New active status.
 * @returns {UserModel} Updated user object.
 */
export const updateUserActive = (id: string, isActive: boolean) => {
  const { post } = api();
  return post<UserModel>(`/users/${id}/active`, { isActive });
};
