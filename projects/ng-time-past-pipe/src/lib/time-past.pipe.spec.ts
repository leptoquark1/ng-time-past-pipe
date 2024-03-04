import { TimePastPipe, NgTimePastPipePipe } from './time-past.pipe';
import {
  Component,
  Input,
} from '@angular/core';
import { ComponentFixture, getTestBed } from '@angular/core/testing';

@Component({
  template: `<span id="testOutput">{{ date | timePast: overflow }}</span>`,
})
class TestComponent {
  @Input() date?: Date | string | number;
  @Input() overflow = true;
}

describe('TimePastPipe', () => {

  describe('Classname deprecation', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
      jasmine.clock().mockDate(new Date('2022-06-26T10:00:05Z'));

      getTestBed().configureTestingModule({
        imports: [NgTimePastPipePipe],
        declarations: [TestComponent],
      });

      fixture = getTestBed().createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should be exported as well', () => {
      const outputElement = fixture.nativeElement.querySelector('#testOutput');

      component.date = new Date('2022-06-26T10:00:15Z');
      fixture.detectChanges();

      expect(component).toBeDefined();
      expect(outputElement.textContent).toEqual('in 10 seconds');
    });
  });

  describe('Overflow pipe parameter', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
      jasmine.clock().mockDate(new Date('2022-06-26T10:50:15Z'));

      getTestBed().configureTestingModule({
        imports: [TimePastPipe],
        declarations: [TestComponent],
      });

      fixture = getTestBed().createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should stop with last output when countdown is done', () => {
      const outputElement = fixture.nativeElement.querySelector('#testOutput');

      component.date = new Date('2022-06-26T11:05:15Z');
      component.overflow = false;
      fixture.detectChanges();
      jasmine.clock().mockDate(new Date('2022-06-26T11:05:15Z'));
      fixture.detectChanges();
      jasmine.clock().mockDate(new Date('2022-06-26T11:10:15Z'));
      fixture.detectChanges();

      expect(component).toBeDefined();
      expect(outputElement.textContent).toEqual('about now');
    });
    it('should behave normally when parameter is true or skipped', () => {
      const outputElement = fixture.nativeElement.querySelector('#testOutput');

      component.date = new Date('2022-06-26T11:05:15Z');
      component.overflow = true;
      fixture.detectChanges();
      jasmine.clock().mockDate(new Date('2022-06-26T11:10:15Z'));
      fixture.detectChanges();

      expect(component).toBeDefined();
      expect(outputElement.textContent).toEqual('5 minutes ago');
    });
  });
});
