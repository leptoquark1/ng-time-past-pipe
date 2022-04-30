import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { getDataSourcesExamples, getFutureExamples, getOutputExamples } from './examples';


@Component({
  selector: 'tpp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private lastCustomInputElement;

  outputExamples = getOutputExamples();
  sourcesExamples = getDataSourcesExamples();
  futureExamples = getFutureExamples();
  customInputValue: any;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  loadDataOutputExamples(): void {
    this.outputExamples = getOutputExamples();
    this.cdr.markForCheck();
  }

  loadDataSourcesExamples(): void {
    this.sourcesExamples = getDataSourcesExamples();
    this.cdr.markForCheck();
  }

  loadDataFutureExamples(): void {
    this.futureExamples = getFutureExamples();
    this.cdr.detectChanges();
  }

  onCustomInputChange(event?): void {
    if (!event && !this.lastCustomInputElement) {
      return;
    }
    if (event && event.target) {
      this.lastCustomInputElement = event.target;
    }
    this.customInputValue = (new Date(this.lastCustomInputElement.value)).toISOString();
  }
}
