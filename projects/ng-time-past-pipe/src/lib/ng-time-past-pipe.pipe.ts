import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';

const secondsOfA = {
  minute: 60,
  hour: 60 * 60,
  day: 60 * 60 * 24,
};

@Pipe({
  name: 'timePast',
  pure: false,
})
export class NgTimePastPipePipe implements PipeTransform, OnDestroy {
  private lastSeconds: number;
  private lastResult: string;
  private timer: number;

  /**
   * TimePastPipe Class Constructor
   */
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  /**
   * Determinate the point of time on when the output should be checked for a update
   *
   * @param seconds The latest seconds that have been passed
   * @return A point of time in future in seconds
   */
  private static getSecondsUntilUpdate(seconds: number): number {
    if (seconds < secondsOfA.minute) { // less than 1 min, update every 2 secs
      return 1;
    } else if (seconds < secondsOfA.hour) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < secondsOfA.day) { // less then a day, update every 5 min
      return 300;
    }
    // update every hour
    return 3600;
  }

  /**
   * Return a respective textual representation of the input, as the input is a timespan that has been passed.
   *
   * @param seconds The seconds that represent the time that has been passed
   */
  private static getStringDiff(seconds: number) {
    if (seconds <= 5) {
      return 'a few seconds ago';
    } else if (seconds <= 59) {
      return seconds + ' seconds ago';
    } else if (seconds <= 90) {
      return 'about a minute ago';
    }

    const minutes = Math.round(Math.abs(seconds / 60));
    if (minutes <= 45) {
      return minutes + ' minutes ago';
    } else if (minutes <= 90) {
      return 'an hour ago';
    }

    const hours = Math.round(Math.abs(minutes / 60));
    if (hours <= 22) {
      return hours + ' hours ago';
    } else if (hours <= 36) {
      return 'a day ago';
    }

    const days = Math.round(Math.abs(hours / 24));
    if (days <= 25) {
      return days + ' days ago';
    } else if (days <= 45) {
      return 'a month ago';
    }

    const months = Math.round(Math.abs(days / 30.416));
    if (days <= 345) {
      return months + ' months ago';
    } else if (days <= 545) {
      return 'a year ago';
    }

    return Math.round(Math.abs(days / 365)) + ' years ago';
  }

  /**
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past
   * @return (Number | String | Date) The textual representation of the time that has been passed between the given Date
   *  and the current. If input is in the future or invalid it returns the input itself.
   */
  transform<T extends (number | string | Date)>(value: T): string | T {
    const dateValue = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - dateValue.getTime()) / 1000));

    if (Number.isNaN(seconds) || seconds < 0) {
      console.warn(`[TimeAgoPipe] Invalid Input of type ${typeof value} (${value}).`)
      return value;
    }

    if (this.lastSeconds === seconds) {
      return this.lastResult;
    }
    this.lastSeconds = seconds;

    const result = this.lastResult = NgTimePastPipePipe.getStringDiff(seconds);

    let timer: number;
    this.timer = timer = setTimeout(() => {
      this.changeDetectorRef.markForCheck();
      clearTimeout(timer);
    }, NgTimePastPipePipe.getSecondsUntilUpdate(seconds) * 1000) as unknown as number;

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
