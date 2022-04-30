import { TestBed } from '@angular/core/testing';
import { NgTimePastPipeModule } from './time-past.module';

describe('NgTimePastPipeModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgTimePastPipeModule],
    });
  });

  it('is being initialized', () => {
    const module = TestBed.inject(NgTimePastPipeModule);

    expect(module).toBeTruthy();
  });
});
