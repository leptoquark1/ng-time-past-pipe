import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getDataSourcesExamples, getFallbackExamples, getOutputExamples } from './examples';


@Component({
  selector: 'tpp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private lastCustomInputElement;

  outputExamples = getOutputExamples();
  sourcesExamples = getDataSourcesExamples();
  fallbackExamples = getFallbackExamples();
  customInputValue: any;

  loadDataOutputExamples(): void {
    this.outputExamples = getOutputExamples();
  }

  loadDataSourcesExamples(): void {
    this.sourcesExamples = getDataSourcesExamples();
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
