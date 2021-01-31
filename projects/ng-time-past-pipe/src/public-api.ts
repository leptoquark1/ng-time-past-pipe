/*
 * Public API Surface of ng-time-past-pipe
 */
export * from './lib/time-past.pipe';
export * from './lib/time-past.module';
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
export { TAInput } from './lib/time-past';
export * from './lib/time-past.service';
