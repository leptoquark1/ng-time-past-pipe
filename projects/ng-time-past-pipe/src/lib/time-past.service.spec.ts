import { TestBed } from '@angular/core/testing';
import { TimePastService } from './time-past.service';
import {
  defaultTimeDiffGenerator,
  TimeDiff,
  TimeDiffGenerator,
} from './time-diff';

import * as timePast from './time-past';
import * as timeDiff from './time-diff';
import { CUSTOM_TIME_DIFF_GENERATOR } from 'ng-time-past-pipe';

describe('TimePastService injection', () => {
  let service: TimePastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(TimePastService);
  });

  it('can be created', () => {
    expect(service).toBeDefined();
  });
});

describe('@timePast', () => {
  const generatorSpy = jasmine.createSpy(
    'timeDiffGenerator',
    defaultTimeDiffGenerator
  );
  let service: TimePastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimePastService,
        { provide: CUSTOM_TIME_DIFF_GENERATOR, useValue: generatorSpy },
      ],
    });

    service = TestBed.inject(TimePastService);

    generatorSpy.and.stub();
  });

  describe('input validation', () => {
    let timeDiffGeneratorSpy: jasmine.SpyObj<TimeDiffGenerator>;
    let validateTAInputTypeSpy: jasmine.Spy<(...args: unknown[]) => boolean>;

    beforeAll(() => {
      validateTAInputTypeSpy = spyOn(timePast, 'validateTAInputType');
      timeDiffGeneratorSpy = TestBed.inject(
        CUSTOM_TIME_DIFF_GENERATOR
      ) as jasmine.SpyObj<TimeDiffGenerator>;
    });

    beforeEach(() => {
      validateTAInputTypeSpy.calls.reset();
      generatorSpy.and.callThrough();
    });

    it(`should return undefined when input validation fails`, () => {
      validateTAInputTypeSpy.and.returnValue(false);

      const input = new Date().toISOString();
      expect(service.timePast(input)).toBeUndefined();
      expect(validateTAInputTypeSpy).toHaveBeenCalledOnceWith(input);
    });

    it(`should not return undefined when input validation succeed`, () => {
      validateTAInputTypeSpy.and.returnValue(true);

      const input = new Date();
      expect(service.timePast(input)).toBeDefined();
      expect(validateTAInputTypeSpy).toHaveBeenCalledOnceWith(input);
    });
  });

  describe('further modules called', () => {
    let validateTAInputTypeSpy: jasmine.Spy<(...args: unknown[]) => boolean>;
    let parseInputValueSpy: jasmine.Spy<(...args: unknown[]) => number>;
    let createTimeDiffSpy: jasmine.Spy<(...args: unknown[]) => TimeDiff>;

    beforeAll(() => {
      validateTAInputTypeSpy = spyOn(timePast, 'validateTAInputType');
      parseInputValueSpy = spyOn(timePast, 'parseInputValue');
      createTimeDiffSpy = spyOn(timeDiff, 'createTimeDiff');
    });

    beforeEach(() => {
      validateTAInputTypeSpy.calls.reset();
      parseInputValueSpy.calls.reset();
      createTimeDiffSpy.calls.reset();
      generatorSpy.calls.reset();

      generatorSpy.and.callThrough();
      validateTAInputTypeSpy.and.returnValue(true);
      parseInputValueSpy.and.callThrough();
      createTimeDiffSpy.and.callThrough();
    });

    it('should call all corresponding module function', () => {
      const input = new Date().toISOString();

      expect(service.timePast(input)).toBeDefined();
      expect(validateTAInputTypeSpy).toHaveBeenCalledOnceWith(input);
      expect(parseInputValueSpy).toHaveBeenCalledOnceWith(input);
      expect(createTimeDiffSpy).toHaveBeenCalledOnceWith(
        parseInputValueSpy.calls.first().returnValue
      );
      expect(generatorSpy).toHaveBeenCalledOnceWith(
        createTimeDiffSpy.calls.first().returnValue
      );
    });
  });
});
