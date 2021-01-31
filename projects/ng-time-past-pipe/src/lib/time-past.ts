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
    if (value < 0) { value *= -1; } // Negative number will be handled a positive

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

  const dateNowTime = Date.now();
  if (dateNowTime <= dateValueTime) {
    return -1; // Ceil future event
  }

  // Using Math.floor to make sure show the past seconds
  return Math.floor((dateNowTime - dateValueTime) / 1000);
}

/**
 * Strict TAInput Type Validator
 *
 * @param value The optimistic input value to validate
 * @internal
 */
export const validateTAInputType = (value: TAInput): boolean => {
  return (typeof value === 'number' || typeof value === 'string' || value instanceof Date);
}
