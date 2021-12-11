import { InjectionToken } from '@angular/core';
import { interval, Observable } from 'rxjs';

export const TIME_PAST_TICKER = new InjectionToken<Observable<number>>('TimePastTimer', {
  factory: () => interval(1000),
  providedIn: 'root'
});
