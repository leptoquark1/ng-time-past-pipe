import { getTestBed } from '@angular/core/testing';
import { TimePastService } from './time-past.service';
import { CUSTOM_TIME_DIFF_GENERATOR } from './time-diff';

describe('@TimePastService', () => {
  beforeEach(() => {
    getTestBed().configureTestingModule({
      providers: [TimePastService],
    });
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  })

  it('can be created', () => {
    const service = getTestBed().inject(TimePastService);
    expect(service).toBeDefined();
  });

  it(`input validation should return undefined when input validation fails`, () => {
    const service = getTestBed().inject(TimePastService);

    const input = 'invalid-input';
    expect(service.timePast(input)).toBeUndefined();
  });

  it(`input validation should not return undefined when input validation succeed`, () => {
    const service = getTestBed().inject(TimePastService);

    const input = new Date();
    expect(service.timePast(input)).toBeDefined();
  });

  it('should use default custom time diff generator if not provided', () => {
    const service = getTestBed().inject(TimePastService);

    expect(service.timePast(new Date())).toBe('about now');
  });

  it('should use custom time diff generator provider', () => {
    const mockGenerator = jasmine.createSpy('customTimeDiff').and.returnValue('overridden!');

    getTestBed().overrideProvider(
      CUSTOM_TIME_DIFF_GENERATOR,
      { useValue: mockGenerator }
    );
    const service = getTestBed().inject(TimePastService);

    expect(service.timePast(new Date())).toBe('overridden!');
    expect(mockGenerator).toHaveBeenCalled();
  });
});
