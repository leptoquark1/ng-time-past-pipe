import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { getDataSourcesExamples, getFutureExamples, getOutputExamples } from './examples';


@Component({
  selector: 'tpp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private lastCustomInputElement?: HTMLInputElement;

  outputExamples = getOutputExamples();
  sourcesExamples = getDataSourcesExamples();
  futureExamples = getFutureExamples();
  customInputValue: Date | string | number = '2024-06-26T00:00:00.00Z';

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

  onCustomInputChange(event?: Event): void {
    if (!event && !this.lastCustomInputElement) {
      return;
    }

    if (event?.target) {
      this.lastCustomInputElement = event.target as HTMLInputElement;
    }

    if (this.lastCustomInputElement) {
      this.customInputValue = new Date(this.lastCustomInputElement.value).toISOString();
    }
  }
}
