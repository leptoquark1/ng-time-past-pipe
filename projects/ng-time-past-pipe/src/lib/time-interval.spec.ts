import {
  CUSTOM_UPDATE_INTERVAL_GENERATOR,
  UpdateIntervalGenerator,
  defaultUpdateIntervalGenerator,
} from './time-interval';
import { getTestBed } from '@angular/core/testing';
import { TimeDiff } from './time-diff';

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

describe('CUSTOM_UPDATE_INTERVAL_GENERATOR', () => {
  let updateIntervalGenerator: jasmine.Spy<UpdateIntervalGenerator>;
  let customUpdateIntervalGeneratorMock: jasmine.Spy;

  beforeEach(() => {
    getTestBed().configureTestingModule({
      providers: [],
    });

    updateIntervalGenerator = jasmine.createSpy(
      'updateIntervalGenerator',
      defaultUpdateIntervalGenerator
    );
    customUpdateIntervalGeneratorMock = jasmine
      .createSpy('customUpdateIntervalGeneratorMock')
      .and.callFake(() => 0);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should not inject any instance when not provided', () => {
    const updateIntervalGeneratorInstance = getTestBed().inject(
      CUSTOM_UPDATE_INTERVAL_GENERATOR,
      null,
    );
    expect(updateIntervalGeneratorInstance).toBeNull();
  });
});
