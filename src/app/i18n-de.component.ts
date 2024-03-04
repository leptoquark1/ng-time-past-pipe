import { Component, Input, OnInit } from '@angular/core';
import { CUSTOM_TIME_DIFF_GENERATOR, TimeDiffGenerator, defaultTimeDiffGenerator, TimeDiff, TimePastPipe } from 'ng-time-past-pipe';

const timeDiffGenerator: TimeDiffGenerator = (diff: TimeDiff) => {
  if (diff.isFuture) return defaultTimeDiffGenerator(diff);

  const { seconds, minutes, hours, months, days, years } = diff;

  if (seconds <= 5) {
    return 'gerade eben';
  } else if (seconds <= 59) {
    return `vor ${seconds} Sekunden`;
  } else if (seconds <= 90) {
    return 'vor etwa einer Minute';
  }

  if (minutes <= 45) {
    return `vor ${minutes} Minuten`;
  } else if (minutes <= 90) {
    return 'vor etwas einer Stunde';
  }

  if (hours <= 22) {
    return `vor ${hours} Stunden`;
  } else if (hours <= 36) {
    return 'vor einem Tag';
  }

  if (days <= 25) {
    return `vor ${days} Tagen`;
  } else if (days <= 45) {
    return 'vor einem Monat';
  }

  if (days <= 345) {
    return `vor ${months} Monaten`;
  } else if (days <= 545) {
    return 'vor einem Jahr';
  }

  return `vor ${years} Jahren`;
};

@Component({
  selector: 'app-i18n-de',
  standalone: true,
  imports: [TimePastPipe],
  viewProviders: [
    {
      provide: CUSTOM_TIME_DIFF_GENERATOR,
      useValue: timeDiffGenerator,
    },
  ],
  template: '{{ date | timePast }}',
})
export class I18nDeComponent {
  @Input() date: Date | string | number = new Date();
}
