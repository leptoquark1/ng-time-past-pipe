import { ChangeDetectorRef, Inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { createTimeDiff, TIME_DIFF_GENERATOR, TimeDiffGenerator } from './time-diff';
import { UPDATE_INTERVAL_GENERATOR, UpdateIntervalGenerator } from './time-interval';

type TAInput = number | string | Date;

@Pipe({
  name: 'timePast',
  pure: false,
})
export class NgTimePastPipePipe implements PipeTransform, OnDestroy {
  private lastInput: any;
  private lastSeconds: number;
  private lastResult: string;
  private timer: any;

  /**
   * TimePastPipe Class Constructor
   */
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(TIME_DIFF_GENERATOR) private readonly timeDiffGenerator: TimeDiffGenerator,
    @Inject(UPDATE_INTERVAL_GENERATOR) private readonly updateIntervalGenerator: UpdateIntervalGenerator,
  ) { }

  /**
   * Optimistic parse a given input to seconds that past between it and now
   *
   * @param value A value of type string, number or date
   * @return The time past in seconds between now and input value
   * @private
   */
  private static parseInputValue(value: TAInput): number {
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
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past
   * @return (Number | String | Date) The textual representation of the time that has been passed between the given Date
   *  and the current. If input is in the future or invalid it returns the input itself.
   */
  transform<T extends TAInput>(value: T): string | T {
    const lastInput = this.lastInput;
    this.lastInput = value;

    if ((typeof value === 'number' || typeof value === 'string' || value instanceof Date) === false) {
      if (lastInput !== value) {
        console.warn(`[TimePastPipe] Invalid Input of type ${typeof value} (${value}).`);
      }
      return value;
    }

    const seconds = NgTimePastPipePipe.parseInputValue(value);
    if (this.lastSeconds === seconds) {
      return this.lastResult;
    }

    this.changeDetectorRef.detach();
    this.lastSeconds = seconds;

    const timeDiff = createTimeDiff(seconds);
    const result = this.lastResult = this.timeDiffGenerator(timeDiff);

    let timer;
    this.timer = timer = setTimeout(() => {
      this.changeDetectorRef.reattach();
      this.changeDetectorRef.markForCheck();
      clearTimeout(timer);
    }, this.updateIntervalGenerator(timeDiff) * 1000);

    this.changeDetectorRef.reattach();
    return result;
  }

  /**
   * We need to check on whether the timer actually has been cleared
   */
  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
