import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CUSTOM_TIME_DIFF_GENERATOR, TimeDiff, TimeDiffGenerator, TimePastPipe, defaultTimeDiffGenerator } from 'ng-time-past-pipe';
import { I18nDeComponent } from './i18n-de.component';

const timeDiffGenerator: TimeDiffGenerator = (diff: TimeDiff) => {
  // Issues view provided injection tokens and provides a fallback
  return defaultTimeDiffGenerator(diff);
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TimePastPipe, I18nDeComponent],
  providers: [
    {
      provide: CUSTOM_TIME_DIFF_GENERATOR,
      useValue: timeDiffGenerator,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
