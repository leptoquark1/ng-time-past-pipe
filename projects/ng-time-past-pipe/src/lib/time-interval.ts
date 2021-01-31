import { CUSTOM_TIME_DIFF_GENERATOR, defaultTimeDiffGenerator, TimeDiff, TimeDiffGenerator } from './time-diff';
import { inject, InjectFlags, InjectionToken } from '@angular/core';

/**
 * Function Type for the `UpdateIntervalGenerator`
 *
 * @public
 * @api
 */
export type UpdateIntervalGenerator = (diff: TimeDiff) => number;

/**
 * Custom `UpdateIntervalGenerator` Injection Token
 *
 * @public
 * @api
 */
export const CUSTOM_UPDATE_INTERVAL_GENERATOR = new InjectionToken<UpdateIntervalGenerator>('Custom Update Interval Generator');

/**
 * Determinate the point of time on when the output should be checked for a update
 *
 * @param diff The time diff object
 * @return A point of time in future in seconds
 * @public
 * @api
 */
export const defaultUpdateIntervalGenerator: UpdateIntervalGenerator = (diff: TimeDiff): number => {
  if (diff.seconds < 60) { // less than 1 min, update every second
    return 1;
  } else if (diff.seconds < 60 * 60) { // less than an hour, update every 30 secs
    return 30;
  } else if (diff.seconds < 60 * 60 * 24) { // less then a day, update every 5 min
    return 300;
  }
  // update every hour
  return 3600;
}

/**
 * Provides the `UpdateIntervalGenerator` preferring a custom provider for internal usage
 *
 * @internal
 */
export const UPDATE_INTERVAL_GENERATOR = new InjectionToken<UpdateIntervalGenerator>('Update Interval Generator', {
  factory: () => {
    const customGenerator = inject(CUSTOM_UPDATE_INTERVAL_GENERATOR, InjectFlags.Optional);
    return customGenerator ?? defaultUpdateIntervalGenerator;
  },
});
