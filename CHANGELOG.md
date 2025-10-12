# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.1.1](https://github.com/leptoquark1/ng-time-past-pipe/compare/v3.1.0...v3.1.1) (2025-10-12)


### Bug Fixes

* compatibility with angular 20 ([d0d336f](https://github.com/leptoquark1/ng-time-past-pipe/commit/d0d336fe625e922359e0760aa310dc54f3caf57b)), closes [#45](https://github.com/leptoquark1/ng-time-past-pipe/issues/45)
* custom time-diff and interval generator in angular v15 and greater ([99fcb15](https://github.com/leptoquark1/ng-time-past-pipe/commit/99fcb1587274b2e53bc0b2e43cfe04723e4cdb48)), closes [#44](https://github.com/leptoquark1/ng-time-past-pipe/issues/44)

## [3.1.0](https://github.com/leptoquark1/ng-time-past-pipe/compare/v3.0.0...v3.1.0) (2023-01-07)


### Features

* introduce pipe parameter to control countdown overflow behaviour ([f95d5ce](https://github.com/leptoquark1/ng-time-past-pipe/commit/f95d5ce75000c73b986bd0aee86ae7ce00dc94f5))

## [3.0.0](https://github.com/leptoquark1/ng-time-past-pipe/compare/v2.0.0...v3.0.0) (2022-06-26)


### ⚠ BREAKING CHANGES

* `NgTimePastPipeModule` was removed in favor of standalone pipe. Import `TimePastPipe` in your module/component instead.
With these changes, all following versions of this package will only be compatible with Angular >=v14.0.0. Check previous versions for support of Angular 13 and below.

### Features

* standalone pipe as introduced with angular v14 ([b277811](https://github.com/leptoquark1/ng-time-past-pipe/commit/b277811a41aaf75857efb8b514851d0fcd6dd766))

## [2.0.0](https://github.com/leptoquark1/ng-time-past-pipe/compare/v1.3.2...v2.0.0) (2022-04-30)


### ⚠ BREAKING CHANGES

* The `CUSTOM_TIME_DIFF_GENERATOR` is now also
responsible for processing future events. Therefore, it may happen that
those are misinterpreted as past events. To distinguish, please use the
`isFuture` property of the timeDiff parameter.

### Features

* add support for events in the future ([1765e95](https://github.com/leptoquark1/ng-time-past-pipe/commit/1765e95dd04d906acb1738cb2fc5552aaa827094)), closes [#6](https://github.com/leptoquark1/ng-time-past-pipe/issues/6)

### [1.3.2](https://github.com/leptoquark1/ng-time-past-pipe/compare/v1.3.1...v1.3.2) (2021-12-11)


### Bug Fixes

* synchronize update when multi pipes are used ([f1e036e](https://github.com/leptoquark1/ng-time-past-pipe/commit/f1e036ea5f897078a1a99dde13147bbdd893a2cd))

### [1.3.1](https://github.com/leptoquark1/ng-time-past-pipe/compare/v1.3.0...v1.3.1) (2021-05-09)

## 1.3.0 (2021-02-05)

### Features

- support for customizable output
- support for customizable update interval
- expose a public service to loose this feature from the pipe 

### Bug Fixes

- **build** type error in build process

## 1.2.0 (2021-02-05)

### Features

- support for unix time input and rely on a optimistic output

## 1.1.0 (2021-01-22)

### Features

- **deps** support for Angular 10 and 11

## 1.0.0 (2020-04-04)

### Features

- first stable release
