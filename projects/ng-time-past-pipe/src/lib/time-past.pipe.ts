import { ChangeDetectorRef, inject, InjectFlags, OnDestroy, Pipe, PipeTransform, } from '@angular/core';
import { createTimeDiff, CUSTOM_TIME_DIFF_GENERATOR, defaultTimeDiffGenerator, } from './time-diff';
import { CUSTOM_UPDATE_INTERVAL_GENERATOR, defaultUpdateIntervalGenerator } from './time-interval';
import { parseInputValue, TAInput, validateTAInputType } from './time-past';
import { TIME_PAST_TICKER } from './ticker';
import { filter, map } from 'rxjs/operators';

@Pipe({
  standalone: true,
  name: 'timePast',
  pure: false,
})
export class TimePastPipe implements PipeTransform, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly ticker = inject(TIME_PAST_TICKER);
  private readonly timeDiffGenerator =
    inject(CUSTOM_TIME_DIFF_GENERATOR, InjectFlags.Optional) ?? defaultTimeDiffGenerator;
  private readonly updateIntervalGenerator =
    inject(CUSTOM_UPDATE_INTERVAL_GENERATOR, InjectFlags.Optional) ?? defaultUpdateIntervalGenerator;

  private initialSeconds: any;
  private lastInput: any;
  private lastSeconds?: number;
  private lastResult?: string;

  private currentPeriod = 1;
  private readonly intervalTimer = this.ticker.pipe(
    filter((tick) => tick % this.currentPeriod === 0),
    map((tick) => tick / this.currentPeriod)
  );
  private readonly intervalSubscription = this.intervalTimer.subscribe(() =>
    this.changeDetectorRef.markForCheck()
  );

  /**
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past or future
   * @param overflow Overflow to time in past when initial date was in future
   * @return The textual representation of the time that has been passed between the given Date
   *  and the current.
   */
  transform<T extends TAInput>(value: T, overflow = true): undefined | string | T {
    if (this.isValidInput(value) === false) {
      return value;
    }

    const seconds = parseInputValue(value);
    this.initialSeconds ||= seconds;

    if (this.lastSeconds === seconds || (overflow === false && this.initialSeconds < 0 && seconds > 0)) {
      return this.lastResult;
    }

    // The ChangeDetector should not call transform again while the new value is being resolved
    this.changeDetectorRef.detach();

    this.lastSeconds = seconds;

    const timeDiff = createTimeDiff(seconds);
    const result = (this.lastResult = this.timeDiffGenerator(timeDiff));

    // Make sure the update interval refreshed as well
    this.currentPeriod = this.updateIntervalGenerator(timeDiff);

    // Reattach the ChangeDetector so that further changes are being transformed
    this.changeDetectorRef.reattach();

    return result;
  }

  /**
   * Validate the Input Value and log a warning per value when it fails
   *
   * @param value
   * @private
   */
  private isValidInput(value: TAInput): boolean {
    const validationResult = validateTAInputType(value);

    if (validationResult === false && this.lastInput !== value) {
      console.warn(
        `[TimePastPipe] Invalid Input of type ${typeof value} (${value}).`
      );
    }

    this.lastInput = value;

    return validationResult;
  }

  /**
   * Clear interval ticker subscription
   */
  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}

/**
 * @deprecated Use TimePastPipe instead
 */
export const NgTimePastPipePipe = TimePastPipe;
