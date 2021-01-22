import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgTimePastPipeModule } from 'ng-time-past-pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgTimePastPipeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
