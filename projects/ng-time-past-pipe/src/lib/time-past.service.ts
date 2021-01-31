import { Inject, Injectable } from '@angular/core';
import { createTimeDiff, TIME_DIFF_GENERATOR, TimeDiffGenerator } from './time-diff';
import { parseInputValue, TAInput, validateTAInputType } from './time-past';

@Injectable({ providedIn: 'root' })
/**
 * Public TimePast Service Class
 *
 * @public
 * @api
 */
export class TimePastService {
  constructor(@Inject(TIME_DIFF_GENERATOR) private readonly timeDiffGenerator: TimeDiffGenerator) { }

  /**
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past
   * @return The textual representation of the time that has been passed between the given Date
   *  and the current.
   */
  timePast(value: TAInput): string {
    if (validateTAInputType(value) === false) {
      return undefined;
    }

    const seconds = parseInputValue(value);
    const timeDiff = createTimeDiff(seconds);

    return this.timeDiffGenerator(timeDiff);
  }
}
