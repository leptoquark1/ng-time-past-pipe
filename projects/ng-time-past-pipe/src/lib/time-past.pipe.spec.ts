import { NgTimePastPipePipe } from './time-past.pipe';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { defaultTimeDiffGenerator, TimeDiff } from './time-diff';
import { defaultUpdateIntervalGenerator } from './time-interval';
import * as timePast from './time-past';
import * as timeDiff from './time-diff';

describe('NgTimePastPipePipe', () => {
  const changeDetectorRefSpy = jasmine.createSpyObj('changeDetectorRef', [
    'markForCheck',
    'detach',
    'reattach',
  ]);
  const timeDiffGeneratorSpy = jasmine.createSpy(
    'timeDiffGenerator',
    defaultTimeDiffGenerator
  );
  const updateIntervalGeneratorSpy = jasmine.createSpy(
    'updateIntervalGenerator',
    defaultUpdateIntervalGenerator
  );
  let pipe: NgTimePastPipePipe;

  beforeEach(() => {
    pipe = new NgTimePastPipePipe(
      changeDetectorRefSpy as ChangeDetectorRef,
      interval(1000),
      timeDiffGeneratorSpy,
      updateIntervalGeneratorSpy
    );
  });

  describe('@ngOnDestroy', () => {
    let unsubscribeSpy: jasmine.Spy;

    beforeEach(() => {
      unsubscribeSpy = spyOn(
        (pipe as any).intervalSubscription,
        'unsubscribe'
      ).and.callThrough();
    });

    it('should close all subscriptions', () => {
      pipe.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('@transform', () => {
    let validateTAInputTypeSpy: jasmine.Spy<(...args) => boolean>;
    let parseInputValueSpy: jasmine.Spy<(...args) => number>;
    let createTimeDiffSpy: jasmine.Spy<(...args) => TimeDiff>;

    beforeAll(() => {
      validateTAInputTypeSpy = spyOn(timePast, 'validateTAInputType');
      parseInputValueSpy = spyOn(timePast, 'parseInputValue');
      createTimeDiffSpy = spyOn(timeDiff, 'createTimeDiff');
    });

    beforeEach(() => {
      validateTAInputTypeSpy.calls.reset();
      parseInputValueSpy.calls.reset();
      createTimeDiffSpy.calls.reset();
      timeDiffGeneratorSpy.calls.reset();
      updateIntervalGeneratorSpy.calls.reset();
      changeDetectorRefSpy.detach.calls.reset();
      changeDetectorRefSpy.reattach.calls.reset();

      timeDiffGeneratorSpy.and.callThrough();
      validateTAInputTypeSpy.and.returnValue(true);
      parseInputValueSpy.and.callThrough();
      createTimeDiffSpy.and.callThrough();
    });

    it('should call all corresponding module function', () => {
      const input = new Date(Date.now() - 3600).toISOString();

      expect(pipe.transform(input)).toBeDefined();
      expect(validateTAInputTypeSpy).toHaveBeenCalledOnceWith(input);
      expect(parseInputValueSpy).toHaveBeenCalledOnceWith(input);
      expect(createTimeDiffSpy).toHaveBeenCalledOnceWith(
        parseInputValueSpy.calls.first().returnValue
      );
      expect(timeDiffGeneratorSpy).toHaveBeenCalledOnceWith(
        createTimeDiffSpy.calls.first().returnValue
      );
      expect(updateIntervalGeneratorSpy).toHaveBeenCalledOnceWith(
        createTimeDiffSpy.calls.first().returnValue
      );
      expect(changeDetectorRefSpy.detach).toHaveBeenCalledTimes(1);
      expect(changeDetectorRefSpy.detach).toHaveBeenCalledBefore(
        changeDetectorRefSpy.reattach
      );
      expect(changeDetectorRefSpy.reattach).toHaveBeenCalledTimes(1);
    });
  });

  describe('@isValidInput', () => {
    let isValidInputSpy: jasmine.Spy;
    let consoleSpy: jasmine.Spy;

    beforeEach(() => {
      isValidInputSpy = spyOn(pipe as any, 'isValidInput').and.callThrough();
      consoleSpy = spyOn(console, 'warn').and.callFake((m) => {});

      isValidInputSpy.calls.reset();
      consoleSpy.calls.reset();
      timeDiffGeneratorSpy.and.callThrough();
      updateIntervalGeneratorSpy.and.callThrough();
    });

    it('returns input when input validation fails', () => {
      const input1 = false;
      const input2 = null;

      expect(pipe.transform(input1 as any)).toEqual(input1);

      expect(pipe.transform(input1 as any)).toEqual(input1);
      expect(pipe.transform(input2 as any)).toEqual(input2);

      expect(isValidInputSpy.calls.all().map((call) => call.args[0])).toEqual([
        input1,
        input1,
        input2,
      ]);
      expect(consoleSpy)
        .withContext('Warn log should only be called one per input value')
        .toHaveBeenCalledTimes(2);

      // @ts-ignore
      expect(pipe.lastInput).toEqual(input2);
    });

    it('returns string value when input is valid', () => {
      const input = new Date().toISOString();

      const result = pipe.transform(input);

      expect(result).toBeDefined();
      expect(result).not.toBe(input);

      expect(isValidInputSpy).toHaveBeenCalledWith(input);
      expect(consoleSpy).toHaveBeenCalledTimes(0);

      // @ts-ignore
      expect(pipe.lastInput).toEqual(input);
    });
  });
});
