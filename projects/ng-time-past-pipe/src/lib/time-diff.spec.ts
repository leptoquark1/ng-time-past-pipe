import {
  createTimeDiff,
  defaultTimeDiffGenerator,
  getFutureDiffString,
  getPastDiffString,
  TimeDiff,
} from './time-diff';

const zeroInput = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  months: 0,
  years: 0,
  isFuture: true,
};

describe('createTimeDiff', () => {
  const values: Array<[number, TimeDiff]> = [
    [
      1,
      {
        isFuture: false,
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 1,
      },
    ],
    [
      500,
      {
        isFuture: false,
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 8,
        seconds: 500,
      },
    ],
    [
      1000,
      {
        isFuture: false,
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 17,
        seconds: 1000,
      },
    ],
    [
      50000,
      {
        isFuture: false,
        years: 0,
        months: 0,
        days: 1,
        hours: 14,
        minutes: 833,
        seconds: 50000,
      },
    ],
    [
      100000,
      {
        isFuture: false,
        years: 0,
        months: 0,
        days: 1,
        hours: 28,
        minutes: 1667,
        seconds: 100000,
      },
    ],
    [
      5000000,
      {
        isFuture: false,
        years: 0,
        months: 2,
        days: 58,
        hours: 1389,
        minutes: 83333,
        seconds: 5000000,
      },
    ],
    [
      15000000,
      {
        isFuture: false,
        years: 0,
        months: 6,
        days: 174,
        hours: 4167,
        minutes: 250000,
        seconds: 15000000,
      },
    ],
    [
      55000000,
      {
        isFuture: false,
        years: 2,
        months: 21,
        days: 637,
        hours: 15278,
        minutes: 916667,
        seconds: 55000000,
      },
    ],
    [
      Number.MAX_SAFE_INTEGER,
      {
        isFuture: false,
        years: 285616415,
        months: 3427472099,
        days: 104249991374,
        hours: 2501999792984,
        minutes: 150119987579017,
        seconds: Number.MAX_SAFE_INTEGER,
      },
    ],
  ];

  describe('correct output for dates in the past', () => {
    values.forEach(([input, output]) => {
      it(`parse the positive value ${input} as the correct diff object`, () => {
        expect(createTimeDiff(input)).toEqual(output);
      });
    });
  });

  describe('correct output for dates in the future', () => {
    values.forEach(([input, output]) => {
      const inputFuture = input * -1;
      const outputFuture = { ...output, isFuture: true };

      it(`parse the negative value ${inputFuture} as the correct diff object`, () => {
        expect(createTimeDiff(inputFuture)).toEqual(outputFuture);
      });
    });
  });
});

describe('getPastDiffString', () => {
  const values: Array<[Partial<TimeDiff>, string]> = [
    [
      {
        seconds: 3,
      },
      'a few seconds ago',
    ],
    [
      {
        seconds: 6,
      },
      '6 seconds ago',
    ],
    [
      {
        seconds: 59,
      },
      '59 seconds ago',
    ],
    [
      {
        seconds: 60,
        minutes: 1,
      },
      'about a minute ago',
    ],
    [
      {
        seconds: 89,
        minutes: 1,
      },
      'about a minute ago',
    ],
    [
      {
        seconds: 91,
        minutes: 2,
      },
      '2 minutes ago',
    ],
    [
      {
        seconds: 2700,
        minutes: 45,
        hours: 1,
      },
      '45 minutes ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 46,
        hours: 1,
      },
      'one hour ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 90,
        hours: 1,
      },
      'one hour ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 2,
      },
      '2 hours ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 22,
      },
      '22 hours ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 23,
        days: 1,
      },
      'a day ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 36,
        days: 1,
      },
      'a day ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 2,
      },
      '2 days ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 25,
      },
      '25 days ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 26,
        months: 1,
      },
      'a month ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 45,
        months: 1,
      },
      'a month ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 345,
        months: 11,
        years: 1,
      },
      '11 months ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 346,
        months: 12,
        years: 1,
      },
      'a year ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 545,
        months: 18,
        years: 1,
      },
      'a year ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 546,
        months: 19,
        years: 1,
      },
      '1 years ago',
    ],
    [
      {
        seconds: 2701,
        minutes: 91,
        hours: 37,
        days: 546,
        months: 19,
        years: 12,
      },
      '12 years ago',
    ],
  ];

  values.forEach(([originalInput, output]) => {
    const input = {
      ...zeroInput,
      ...originalInput,
      isFuture: false,
    };

    it(`returns ${output} as the correct string`, () => {
      expect(getPastDiffString(input)).toEqual(output);
    });
  });
});

describe('getFutureDiff', () => {
  const values: Array<[Partial<TimeDiff>, string]> = [
    [
      {
        seconds: 1,
      },
      'in 1 seconds',
    ],
    [
      {
        seconds: 12,
      },
      'in 12 seconds',
    ],
    [
      {
        seconds: 59,
      },
      'in 59 seconds',
    ],
    [
      {
        seconds: 60,
        minutes: 1,
      },
      'in one minute',
    ],
    [
      {
        seconds: 89,
        minutes: 1,
      },
      'in one minute',
    ],
    [
      {
        seconds: 91,
        minutes: 2,
      },
      'in 2 minutes',
    ],
    [
      {
        seconds: 3540,
        minutes: 59,
      },
      'in 59 minutes',
    ],
    [
      {
        seconds: 3600,
        minutes: 60,
        hours: 1,
      },
      'in one hour',
    ],
    [
      {
        seconds: 5280,
        minutes: 88,
        hours: 1,
      },
      'in one hour',
    ],
    [
      {
        seconds: 5401,
        minutes: 91,
        hours: 2,
      },
      'in 2 hours',
    ],
    [
      {
        seconds: 79200,
        minutes: 1320,
        hours: 22,
      },
      'in 22 hours',
    ],
    [
      {
        seconds: 86400,
        minutes: 1440,
        hours: 24,
        days: 1,
      },
      'in one day',
    ],
    [
      {
        seconds: 126000,
        minutes: 2100,
        hours: 35,
        days: 1,
      },
      'in one day',
    ],
    [
      {
        seconds: 126001,
        minutes: 2101,
        hours: 37,
        days: 2,
      },
      'in 2 days',
    ],
    [
      {
        seconds: 2160000,
        minutes: 36000,
        hours: 600,
        days: 25,
      },
      'in 25 days',
    ],
    [
      {
        seconds: 2160001,
        minutes: 36001,
        hours: 601,
        days: 37,
        months: 1,
      },
      'in one month',
    ],
    [
      {
        seconds: 3801600,
        minutes: 63360,
        hours: 1056,
        days: 44,
        months: 1,
      },
      'in one month',
    ],
    [
      {
        seconds: 3888001,
        minutes: 64801,
        hours: 1081,
        days: 46,
        months: 2,
      },
      'in 2 months',
    ],
    [
      {
        seconds: 21081600,
        minutes: 351360,
        hours: 5856,
        days: 244,
        months: 8,
      },
      'in 8 months',
    ],
    [
      {
        seconds: 29808000,
        minutes: 496800,
        hours: 8280,
        days: 345,
        months: 12,
      },
      'in 12 months',
    ],
    [
      {
        seconds: 29808001,
        minutes: 496801,
        hours: 8281,
        days: 346,
        months: 13,
        years: 1,
      },
      'in one year',
    ],
    [
      {
        seconds: 47088000,
        minutes: 784800,
        hours: 1308,
        days: 545,
        months: 18,
        years: 1,
      },
      'in one year',
    ],
    [
      {
        seconds: 47088001,
        minutes: 784801,
        hours: 1307,
        days: 546,
        months: 19,
        years: 2,
      },
      'in 2 years',
    ],
    [
      {
        seconds: 378432000,
        minutes: 6307200,
        hours: 105120,
        days: 4380,
        months: 144,
        years: 12,
      },
      'in 12 years',
    ],
  ];

  values.forEach(([originalInput, output]) => {
    const input = {
      ...zeroInput,
      ...originalInput,
    };

    it(`returns ${output} as the correct string`, () => {
      expect(getFutureDiffString(input)).toEqual(output);
    });
  });
});

describe('defaultTimeDiffGenerator', () => {
  const expectedOutput = 'about now';

  it('returns correct string for zero input (isFuture)', () => {
    expect(defaultTimeDiffGenerator(zeroInput)).toEqual(expectedOutput);
    expect(defaultTimeDiffGenerator({ ...zeroInput, isFuture: false })).toEqual(
      expectedOutput
    );
  });
});
