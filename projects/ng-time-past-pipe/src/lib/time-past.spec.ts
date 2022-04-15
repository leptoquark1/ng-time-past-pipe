import { parseInputValue, validateTAInputType } from './time-past';

describe('parseInputValue', () => {
  const time = Date.now();

  beforeEach(() => {
    jasmine.clock().mockDate(new Date(time));
  });

  describe('Time in the past', () => {
    it('should pass-through positive numeric values that are smaller than unix timestamp (length 10)', () => {
      expect(parseInputValue(5)).toBe(5);
      expect(parseInputValue(999)).toBe(999);
      expect(parseInputValue(123456789)).toBe(123456789);
      expect(parseInputValue(987654321)).toBe(987654321);
      expect(parseInputValue(639529)).toBe(639529);
      expect(parseInputValue(0)).toBe(0);
    });

    it('should parse time in past from unix time for positive numeric values (length 10)', () => {
      expect(parseInputValue(Math.floor(new Date(time - 5000).getTime() / 1000))).toBe(5);
      expect(parseInputValue(Math.floor(new Date(time - 100000).getTime() / 1000))).toBe(100);
      expect(parseInputValue(Math.floor(new Date(time - 3256000).getTime() / 1000))).toBe(3256);
      expect(parseInputValue(Math.floor(new Date(time).getTime() / 1000))).toBe(0);
    });

    it('should parse time in past from date objects', () => {
      expect(parseInputValue(new Date(time - 5000))).toBe(5);
      expect(parseInputValue(new Date(time - 100000))).toBe(100);
      expect(parseInputValue(new Date(time - 3256000))).toBe(3256);
      expect(parseInputValue(new Date(time))).toBe(0);
    });

    it('should parse time in past from iso strings', () => {
      expect(parseInputValue(new Date(time - 5000).toISOString())).toBe(5);
      expect(parseInputValue(new Date(time - 100000).toISOString())).toBe(100);
      expect(parseInputValue(new Date(time - 3256000).toISOString())).toBe(3256);
      expect(parseInputValue(new Date(time).toISOString())).toBe(0);
    });
  });

  describe('Time in the future', () => {
    it('should pass-through negative numeric values', () => {
      expect(parseInputValue(-500)).toBe(-500);
      expect(parseInputValue(-1)).toBe(-1);
      expect(parseInputValue(-999)).toBe(-999);
      expect(parseInputValue(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
    });

    it('should parse time in future from unix time for positive numeric values (length 10)', () => {
      expect(parseInputValue(Math.floor(new Date(time + 5000).getTime() / 1000))).toBe(-5);
      expect(parseInputValue(Math.floor(new Date(time + 100000).getTime() / 1000))).toBe(-100);
      expect(parseInputValue(Math.floor(new Date(time + 3256000).getTime() / 1000))).toBe(-3256);
    });

    it('should parse time in future from iso strings', () => {
      expect(parseInputValue(new Date(time + 5000).toISOString())).toBe(-5);
      expect(parseInputValue(new Date(time + 100000).toISOString())).toBe(-100);
      expect(parseInputValue(new Date(time + 3256000).toISOString())).toBe(-3256);
    });
  });

});

describe('validateTAInputType', () => {
  it('return true on valid inputs', () => {
    expect(validateTAInputType('123')).toBeTrue();
    expect(validateTAInputType(1)).toBeTrue();
    expect(validateTAInputType(new Date())).toBeTrue();
  });

  it('return false on invalid inputs', () => {
    // @ts-ignore
    expect(validateTAInputType(() => true)).toBeFalse();
    // @ts-ignore
    expect(validateTAInputType(false)).toBeFalse();
    // @ts-ignore
    expect(validateTAInputType(null)).toBeFalse();
    // @ts-ignore
    expect(validateTAInputType(undefined)).toBeFalse();
    // @ts-ignore
    expect(validateTAInputType({})).toBeFalse();
  });
});
