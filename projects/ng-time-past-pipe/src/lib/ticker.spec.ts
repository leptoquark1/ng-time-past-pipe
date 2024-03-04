import { getTestBed } from '@angular/core/testing';
import { TIME_PAST_TICKER } from './ticker';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

describe('TIME_PAST_TICKER', () => {
  const TEST_SERVICE_1 = new InjectionToken('TestService1');
  const TEST_SERVICE_2 = new InjectionToken('TestService2');
  const tickerFactory = (ticker: Observable<number>) => ({ ticker });

  describe('Instance', () => {
    let tickerInstance: Observable<number>;

    beforeEach(() => {
      getTestBed().configureTestingModule({
        providers: [
          {
            provide: TEST_SERVICE_1,
            useFactory: tickerFactory,
            deps: [TIME_PAST_TICKER],
          },
          {
            provide: TEST_SERVICE_2,
            useFactory: tickerFactory,
            deps: [TIME_PAST_TICKER],
          },
        ],
      });

      tickerInstance = getTestBed().inject(TIME_PAST_TICKER);
    });

    it('should always return the same object', () => {
      expect((getTestBed().inject(TEST_SERVICE_1) as { ticker: Observable<number> }).ticker).toBe(
        tickerInstance
      );
      expect((getTestBed().inject(TEST_SERVICE_2) as { ticker: Observable<number> }).ticker).toBe(
        tickerInstance
      );
    });
  });
});
