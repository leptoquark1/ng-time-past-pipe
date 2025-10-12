import { TimeDiff } from './time-diff';
import { InjectionToken } from '@angular/core';

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
  } else if (diff.seconds < 3600) { // less than an hour, update every 30 secs
    return 30;
  } else if (diff.seconds < 86400) { // less than a day, update every 5 min
    return 300;
  }
  // update every hour
  return 3600;
};
