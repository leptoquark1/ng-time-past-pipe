# NgTimePastPipe

Transform anything that can be parsed to a Date in the past, to a string which represent the relative
time that has been passed between now and this point of time.

This is a rewrite of the orphaned project [AndrewPoyntz Time-ago-pipe](https://github.com/AndrewPoyntz/time-ago-pipe).
It's a hard fork and should provide a better performance and compatibility.

## Installation

```
npm i ng-time-past-pipe
```

## Usage

```ts
import { NgTimePastPipeModule } from 'ng-time-past-pipe';

@NgModule({
  imports: [NgTimePastPipeModule]
})

// [...]
```

```angular2html
<h2>This Page was rendered: {{ date1 | timePast }}</h2>
```
