/*
 * Public API Surface of ng-time-past-pipe
 */

export * from './lib/ng-time-past-pipe.pipe';
export * from './lib/ng-time-past-pipe.module';
export {
  TimeDiffGenerator,
  defaultTimeDiffGenerator,
  CUSTOM_TIME_DIFF_GENERATOR,
} from './lib/time-diff'
export {
  UpdateIntervalGenerator,
  defaultUpdateIntervalGenerator,
  CUSTOM_UPDATE_INTERVAL_GENERATOR,
} from './lib/time-interval';
