// @ts-nocheck
import { parseInputValue } from './time-past';

describe("parseInputValue Test", function() {

  it("Invalid input should return a zero value", function() {
    expect(parseInputValue(undefined)).toBe(0);
    expect(parseInputValue(null)).toBe(0);
    expect(parseInputValue(() => {})).toBe(0);
    expect(parseInputValue(true)).toBe(0);
    expect(parseInputValue(false)).toBe(0);
    expect(parseInputValue(new Object(null))).toBe(0);
    expect(parseInputValue(NaN)).toBe(0);
  });

});
