/**
 * Utility function to check if a value is null or undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is null or undefined, otherwise false.
 */
export const isNull = (value: unknown): value is null => {
  return value === null || value === undefined;
};

/**
 * Utility function to check if value is empty.
 *
 * @param {unknown} value - The value to check.
 * @returns - Returns true if the value is empty, otherwise false.
 */
export const isEmpty = (value: unknown): value is null | undefined => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  // For numbers, booleans, etc., consider them "empty" only if they are falsy (e.g., 0, false)
  return !value;
};
