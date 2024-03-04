import { inject, Injectable, InjectFlags } from '@angular/core';
import { createTimeDiff, CUSTOM_TIME_DIFF_GENERATOR, defaultTimeDiffGenerator } from './time-diff';
import { parseInputValue, TAInput, validateTAInputType } from './time-past';

@Injectable()
/**
 * Public TimePast Service Class
 *
 * @public
 * @api
 */
export class TimePastService {
  private readonly timeDiffGenerator = inject(CUSTOM_TIME_DIFF_GENERATOR, InjectFlags.Optional) ?? defaultTimeDiffGenerator;

  /**
   * Transform anything that can be parsed to a Date in the past, to a string that represent the relative
   *  time that has been passed between now and this point of time.
   *
   * @param value A value that can be parsed to a Date in the past
   * @return The textual representation of the time that has been passed between the given Date
   *  and the current.
   */
  timePast(value: TAInput): undefined | string {
    if (validateTAInputType(value) === false) {
      return undefined;
    }

    const seconds = parseInputValue(value);
    const timeDiff = createTimeDiff(seconds);

    return this.timeDiffGenerator(timeDiff);
  }
}
