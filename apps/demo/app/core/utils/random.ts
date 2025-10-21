/**
 * Generate a random number withing the range [min, max].
 */
export const randomNum = (min: number, max: number) => {
  // Ensure min is less than or equal to max
  if (min > max) {
    [min, max] = [max, min]; // Swap values if min is greater than max
  }

  // Generate a random number within the range [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
