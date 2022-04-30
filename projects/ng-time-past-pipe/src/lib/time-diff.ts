import { inject, InjectFlags, InjectionToken } from '@angular/core';

/**
 * Represents the Time Difference in the different time units
 *
 * @public
 * @api
 */
export interface TimeDiff {
  seconds: number;
  minutes: number;
  hours: number;
  months: number;
  days: number;
  years: number;
  isFuture?: boolean;
}

/**
 * Function Type for the `TimeDiffGenerator`
 *
 * @public
 * @api
 */
export type TimeDiffGenerator = (diff: TimeDiff) => string;

/**
 * Custom `TimeDiffGenerator` Injection Token
 *
 * @public
 * @api
 */
export const CUSTOM_TIME_DIFF_GENERATOR = new InjectionToken<TimeDiffGenerator>(
  'Custom Time Diff Generator'
);

/**
 * Return a respective textual representation of the input, as the input is a timespan that has been passed.
 *
 * @param diff The time diff object
 * @public
 * @api
 */
export const defaultTimeDiffGenerator: TimeDiffGenerator = (
  diff: TimeDiff
): string => {
  if (diff.seconds === 0) {
    return 'about now';
  }

  return diff.isFuture ? getFutureDiffString(diff) : getPastDiffString(diff);
};

export const getPastDiffString = (diff: TimeDiff) => {
  const { seconds, minutes, hours, months, days, years } = diff;

  if (seconds <= 5) {
    return 'a few seconds ago';
  } else if (seconds <= 59) {
    return seconds + ' seconds ago';
  } else if (seconds <= 90) {
    return 'about a minute ago';
  }

  if (minutes <= 45) {
    return minutes + ' minutes ago';
  } else if (minutes <= 90) {
    return 'one hour ago';
  }

  if (hours <= 22) {
    return hours + ' hours ago';
  } else if (hours <= 36) {
    return 'a day ago';
  }

  if (days <= 25) {
    return days + ' days ago';
  } else if (days <= 45) {
    return 'a month ago';
  }

  if (days <= 345) {
    return months + ' months ago';
  } else if (days <= 545) {
    return 'a year ago';
  }

  return years + ' years ago';
};

export const getFutureDiffString = (diff: TimeDiff): string => {
  const { seconds, minutes, hours, months, days, years } = diff;

  if (seconds <= 59) {
    return 'in ' + seconds + ' seconds';
  }

  if (seconds <= 90) {
    return 'in one minute';
  } else if (minutes <= 59) {
    return 'in ' + minutes + ' minutes';
  }

  if (minutes <= 90) {
    return 'in one hour';
  } else if (hours <= 22) {
    return 'in ' + hours + ' hours';
  }

  if (hours <= 36) {
    return 'in one day';
  } else if (days <= 25) {
    return 'in ' + days + ' days';
  }

  if (days <= 45) {
    return 'in one month';
  } else if (days <= 345) {
    return 'in ' + months + ' months';
  }

  if (days <= 545) {
    return 'in one year';
  }

  return 'in ' + years + ' years';
};

/**
 * Provides the TimeDiffGenerator preferring a custom provider for internal usage
 *
 * @internal
 */
export const TIME_DIFF_GENERATOR = new InjectionToken<TimeDiffGenerator>(
  'Time Diff Generator',
  {
    factory: () => {
      const customGenerator = inject(
        CUSTOM_TIME_DIFF_GENERATOR,
        InjectFlags.Optional
      );
      return customGenerator ?? defaultTimeDiffGenerator;
    },
  }
);

/**
 * TimeDiff Factory
 *
 * @param seconds The time difference in seconds. Negative values are considered as a future event
 * @internal
 */
export const createTimeDiff = (seconds: number): TimeDiff => {
  const isFuture = seconds < 0;

  if (isFuture) {
    seconds = Math.abs(seconds);
  }

  const diff: Partial<TimeDiff> = { seconds, isFuture };

  diff.minutes = Math.round(seconds / 60);
  diff.hours = Math.round(diff.minutes / 60);
  diff.days = Math.round(diff.hours / 24);
  diff.months = Math.round(diff.days / 30.416);
  diff.years = Math.round(diff.days / 365);

  return diff as TimeDiff;
};
