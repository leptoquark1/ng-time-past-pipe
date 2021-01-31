# NgTimePastPipe

[![npm](https://img.shields.io/npm/v/ng-time-past-pipe)](https://www.npmjs.com/package/ng-time-past-pipe)
![GitHub issues](https://img.shields.io/github/issues/leptoquark1/ng-time-past-pipe)
![npm bundle size](https://img.shields.io/bundlephobia/min/ng-time-past-pipe)
[![GitHub license](https://img.shields.io/github/license/leptoquark1/ng-time-past-pipe)](https://github.com/leptoquark1/ng-time-past-pipe)

An easy-to-use and lightweight **Angular Pipe**, that transform any DateLike Input to a **human-readable** string that represents the time between now, and the given date!

## Overview

- [x] Supports all common inputs that represent a DateTime including:
  * Numeric Epoch time values like (**Unix Timestamp** or JavaScripts Date.now())
  * **ISO (8601) Strings** (Example `2021-01-31T03:58:23.658Z`)
  * Basically everything that can be parsed by JavaScripts Date Constructor
- [x] Fallback for invalid inputs
- [x] Light-weight, performance optimized and easy to use

### Demo

See it in Action and try it by yourself on the [Demo Playground](https://ng-time-past-pipe-playground.vercel.app/)


### Outputs

From Top to Bottom (First Fit)

| Time Input           | Output             |Extra
| -------------------- | ------------------ |---
| Below 5 seconds      | a few seconds ago  | -
| Below 59 seconds     | X seconds ago      | Updates every second
| Below 90 seconds     | about a minute ago | -
| Below 45 Minutes     | X minutes ago      | Updates every minute
| Below 90 Minutes     | an hour ago        | -
| Below 22 Hours       | X hours ago        | Updates every hour
| Below 36 Hours       | a day ago          | -
| Below 25 Days        | X days ago         | -
| Below 45 Days        | a month ago        | -
| Below 356 Days       | X months ago       | -
| Below 545 Days       | a year ago         | -
| More than 546 Days   | X years ago        | -


## Installation

```
npm i ng-time-past-pipe
```


## Usage

```ts
import { NgTimePastPipeModule } from 'ng-time-past-pipe';

@NgModule({
  imports: [
    NgTimePastPipeModule
  ]
})
export class FeatureModule {}
```

```angular2html
<h2>This Page was rendered: {{ date1 | timePast }}</h2>
```

## Customization

### Overwrite the Result Output

Sometimes it is inevitable to adjust the output. Common use cases are, for example:

- Language Localization (_l10n_) / Internationalization (_i18n_),
- Adjusting the time intervals (_output conditions_) to your own needs. [Check the default time intervals](#outputs)
- Or even more specific customizations

Responsible in the last instance is the `TimeDiffGenerator`.
You can override the default one by providing your own custom generator using the `CUSTOM_TIME_DIFF_GENERATOR` InjectionToken:

```typescript
import {
  CUSTOM_TIME_DIFF_GENERATOR,
  defaultTimeDiffGenerator,
  NgTimePastPipeModule,
  TimeDiffGenerator
} from 'ng-time-past-pipe';

export const timeDiffGenerator: TimeDiffGenerator = (diff): string => {
  if (diff.seconds <= 5) {
    return 'This very Moment';
  } else {
    return defaultTimeDiffGenerator(diff);
  }
}

@NgModule({
  declarations: [TestComponent],
  providers: [
    { provide: CUSTOM_TIME_DIFF_GENERATOR, useValue: timeDiffGenerator },
  ],
  imports: [CommonModule, NgTimePastPipeModule],
  exports: [TestComponent]
})
export class TestModule {}
```

You can always fall back to the `defaultTimeDiffGenerator` your custom one, as shown in the example above.

### Adjust the Update Interval

When you make changes to the "Result Output", you should keep in mind that the default update cycle, while being kept quite general, it's also somewhat adjusted with the default generator.

Default Update Interval:

| Time Difference    | Update Interval  |
| ------------------ | ---------------- |
| less than 1 min    | every second     |
| less than an hour  | every 30 seconds |
| less then a day    | every 5 minutes  |
| greater than a day | every hour       |

If the Change-Detector cycles are no longer sufficient, then you should adapt the UpdateIntervallGenerator to the new circumstances.
Just as with `TimeDiffGenerator`, you can provide the `CUSTOM_UPDATE_INTERVAL_GENERATOR` injection token with an alternative Generator to accomplish this:

```typescript
import { CUSTOM_UPDATE_INTERVAL_GENERATOR, NgTimePastPipeModule } from 'ng-time-past-pipe';

@NgModule({
  providers: [{ provide: CUSTOM_UPDATE_INTERVAL_GENERATOR, useValue: updateIntervalGenerator }],
  imports: [NgTimePastPipeModule],
})
export class TestModule {}
```

```typescript
import { UpdateIntervalGenerator } from 'ng-time-past-pipe';

const updateIntervalGenerator: UpdateIntervalGenerator = (diff): number => {
  if (diff.seconds < 60) {
    return 5;
  }
  return 20;
}
```

Keep in mind that the return value should be the interval in **seconds**.

## Notes

This is a rewrite of the orphaned project [AndrewPoyntz Time-ago-pipe](https://github.com/AndrewPoyntz/time-ago-pipe).
It's a hard fork and should provide a better performance and compatibility.

Feel free to open an issue when you are missing any feature or experience any problems.
Any contributions are welcome :)
