/**
 * Utility function to check if a string is null, undefined, or empty.
 *
 * @param {string | null | undefined} value - The string to check.
 * @returns {boolean} - Returns true if the string is null, undefined, or empty, otherwise false.
 */
export const isNullOrEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value.trim() === '';
};
