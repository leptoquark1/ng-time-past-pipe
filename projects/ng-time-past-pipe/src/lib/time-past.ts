/**
 * Accessor Input Type
 */
export type TAInput = number | string | Date;

/**
 * Optimistic parse a given input to seconds that past between it and now
 *
 * @param value A value of type string, number or date
 * @return The time past in seconds between now and input value
 * @internal
 */
export const parseInputValue = (value: TAInput): number => {
  let dateValueTime;
  if (typeof value === 'number') {
    if (value <= 0) {
      // Negative number will always be handled as seconds in the future
      return value;
    }

    const length = Math.ceil(Math.log10(value + 1));
    if (length < 10 && length > 0) {
      return value; // Guessing the input is already the passed seconds
    }

    if (length === 10) { value *= 1000; } // Guessing UnixTimestamp
    dateValueTime = value; // All other lengths are considered intentional and therefore processed
  } else {
    // Use Date constructor to determine the microseconds
    dateValueTime = (value instanceof Date ? value : new Date(value)).getTime();
  }

  return Math.floor((Date.now() - dateValueTime) / 1000);
};

/**
 * Strict TAInput Type Validator
 *
 * @param value The optimistic input value to validate
 * @internal
 */
export const validateTAInputType = (value: TAInput): boolean => {
  return (typeof value === 'number' || typeof value === 'string' || value instanceof Date);
};
