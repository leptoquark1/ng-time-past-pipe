import {
  CUSTOM_UPDATE_INTERVAL_GENERATOR,
  defaultUpdateIntervalGenerator,
  UPDATE_INTERVAL_GENERATOR,
} from './time-interval';
import { TestBed } from '@angular/core/testing';
import { TimeDiff } from './time-diff';
import { InjectionToken } from '@angular/core';

const zeroTimeDiff: TimeDiff = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  months: 0,
  years: 0,
  isFuture: false,
};

describe('defaultUpdateIntervalGenerator', () => {
  it('should return the predefined interval', () => {
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 0 })
    ).toEqual(1);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 1 })
    ).toEqual(1);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 59 })
    ).toEqual(1);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 61 })
    ).toEqual(30);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 2000 })
    ).toEqual(30);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 3599 })
    ).toEqual(30);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 3600 })
    ).toEqual(300);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 3601 })
    ).toEqual(300);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 44000 })
    ).toEqual(300);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 86399 })
    ).toEqual(300);
    expect(
      defaultUpdateIntervalGenerator({ ...zeroTimeDiff, seconds: 86401 })
    ).toEqual(3600);
    expect(
      defaultUpdateIntervalGenerator({
        ...zeroTimeDiff,
        seconds: Number.MAX_SAFE_INTEGER,
      })
    ).toEqual(3600);
  });
});

describe('UPDATE_INTERVAL_GENERATOR & CUSTOM_UPDATE_INTERVAL_GENERATOR', () => {
  const TEST_SERVICE_1 = new InjectionToken('TestService1');
  const TEST_SERVICE_2 = new InjectionToken('TestService2');
  const updateIntervalGeneratorFactory = (generator) => ({ generator });

  describe('Instance Default', () => {
    let updateIntervalGeneratorInstance: (diff: TimeDiff) => number;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: TEST_SERVICE_1,
            useFactory: updateIntervalGeneratorFactory,
            deps: [UPDATE_INTERVAL_GENERATOR],
          },
          {
            provide: TEST_SERVICE_2,
            useFactory: updateIntervalGeneratorFactory,
            deps: [UPDATE_INTERVAL_GENERATOR],
          },
        ],
      });

      updateIntervalGeneratorInstance = TestBed.inject(
        UPDATE_INTERVAL_GENERATOR
      );
    });

    it('should always return the same object', () => {
      expect((TestBed.inject(TEST_SERVICE_1) as { generator }).generator).toBe(
        updateIntervalGeneratorInstance
      );
      expect((TestBed.inject(TEST_SERVICE_2) as { generator }).generator).toBe(
        updateIntervalGeneratorInstance
      );
    });
  });

  describe('Instance Override', () => {
    let updateIntervalGeneratorInstance: (diff: TimeDiff) => number;
    const spyInstance = jasmine
      .createSpy('customUpdateIntervalGeneratorMock')
      .and.callFake(() => 0);

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: CUSTOM_UPDATE_INTERVAL_GENERATOR,
            useValue: spyInstance,
          },
          {
            provide: TEST_SERVICE_1,
            useFactory: updateIntervalGeneratorFactory,
            deps: [UPDATE_INTERVAL_GENERATOR],
          },
          {
            provide: TEST_SERVICE_2,
            useFactory: updateIntervalGeneratorFactory,
            deps: [UPDATE_INTERVAL_GENERATOR],
          },
        ],
      });

      updateIntervalGeneratorInstance = TestBed.inject(
        UPDATE_INTERVAL_GENERATOR
      );
    });

    it('should not be the original method', () => {
      expect(TestBed.inject(UPDATE_INTERVAL_GENERATOR)).not.toBe(
        defaultUpdateIntervalGenerator
      );
    });

    it('should always return the same object', () => {
      expect((TestBed.inject(TEST_SERVICE_1) as { generator }).generator).toBe(
        updateIntervalGeneratorInstance
      );
      expect((TestBed.inject(TEST_SERVICE_2) as { generator }).generator).toBe(
        updateIntervalGeneratorInstance
      );
    });

    it('should call the custom provided method', () => {
      const customInstance = TestBed.inject(UPDATE_INTERVAL_GENERATOR);

      expect(customInstance(zeroTimeDiff)).toEqual(0);
      expect(spyInstance).toHaveBeenCalled();
    });
  });
});
