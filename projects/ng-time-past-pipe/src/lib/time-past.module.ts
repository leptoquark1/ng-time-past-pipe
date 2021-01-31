import { NgModule } from '@angular/core';
import { NgTimePastPipePipe } from './time-past.pipe';

@NgModule({
  declarations: [NgTimePastPipePipe],
  exports: [NgTimePastPipePipe],
})
export class NgTimePastPipeModule { }
