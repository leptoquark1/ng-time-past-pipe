import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TimePastPipe } from 'ng-time-past-pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TimePastPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
