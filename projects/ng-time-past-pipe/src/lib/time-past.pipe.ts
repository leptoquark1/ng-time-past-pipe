import { ChangeDetectorRef, Inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { createTimeDiff, TIME_DIFF_GENERATOR, TimeDiffGenerator } from './time-diff';
import { UPDATE_INTERVAL_GENERATOR, UpdateIntervalGenerator } from './time-interval';
import { parseInputValue, TAInput, validateTAInputType } from './time-past';
import { TIME_PAST_TICKER } from './ticker';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Pipe({
  name: 'timePast',
  pure: false,
})
export class NgTimePastPipePipe implements PipeTransform, OnDestroy {
  private lastInput: any;
  private lastSeconds: number;
  private lastResult: string;

  private currentPeriod = 1;
  private readonly intervalTimer = this.ticker.pipe(
    filter((tick) => tick % this.currentPeriod === 0),
    map(tick => tick / this.currentPeriod),
  );
  private readonly intervalSubscription: Subscription;

  /**
   * TimePastPipe Class Constructor
   */
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(TIME_PAST_TICKER) private readonly ticker: Observable<number>,
    @Inject(TIME_DIFF_GENERATOR) private readonly timeDiffGenerator: TimeDiffGenerator,
    @Inject(UPDATE_INTERVAL_GENERATOR) private readonly updateIntervalGenerator: UpdateIntervalGenerator,
  ) {
    this.intervalSubscription = this.intervalTimer.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  /**
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past
   * @return The textual representation of the time that has been passed between the given Date
   *  and the current.
   */
  transform<T extends TAInput>(value: T): string | T {
    if (!this.validateInput(value) === false) {
      return value;
    }

    const seconds = parseInputValue(value);
    if (this.lastSeconds === seconds) {
      return this.lastResult;
    }

    this.changeDetectorRef.detach();
    this.lastSeconds = seconds;

    const timeDiff = createTimeDiff(seconds);
    const result = this.lastResult = this.timeDiffGenerator(timeDiff);

    this.currentPeriod = this.updateIntervalGenerator(timeDiff);

    this.changeDetectorRef.reattach();
    return result;
  }

  /**
   * Validate the Input Value and log a warning per value when it fails
   *
   * @param value
   * @private
   */
  private validateInput(value: TAInput): boolean {
    const lastInput = this.lastInput;
    this.lastInput = value;

    if (validateTAInputType(value) === false) {
      if (lastInput !== value) {
        console.warn(`[TimePastPipe] Invalid Input of type ${typeof value} (${value}).`);
      }
      return false;
    }
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
