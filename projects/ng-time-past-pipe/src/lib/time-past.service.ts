import {Inject, Injectable, Optional} from '@angular/core';
import {createTimeDiff, CUSTOM_TIME_DIFF_GENERATOR, defaultTimeDiffGenerator, TimeDiffGenerator} from './time-diff';
import { parseInputValue, TAInput, validateTAInputType } from './time-past';

@Injectable({ providedIn: 'root' })
/**
 * Public TimePast Service Class
 *
 * @public
 * @api
 */
export class TimePastService {
  private readonly timeDiffGenerator: TimeDiffGenerator;

  constructor(@Inject(CUSTOM_TIME_DIFF_GENERATOR) @Optional() timeDiffGenerator: TimeDiffGenerator) {
    this.timeDiffGenerator = timeDiffGenerator ?? defaultTimeDiffGenerator;
  }

  /**
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past
   * @return The textual representation of the time that has been passed between the given Date
   *  and the current.
   */
  timePast(value: TAInput): undefined | string {
    console.log(value, validateTAInputType(value), this.timeDiffGenerator);
    if (!validateTAInputType(value)) {
      return undefined;
    }

    const seconds = parseInputValue(value);
    const timeDiff = createTimeDiff(seconds);

    console.log(seconds, timeDiff);
    return this.timeDiffGenerator(timeDiff);
  }
}
