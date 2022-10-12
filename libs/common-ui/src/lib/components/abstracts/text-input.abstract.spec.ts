import { Component, forwardRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractTextInputComponent } from './text-input.abstract';

@Component({
  selector: 'test-component',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestComponent),
      multi: true,
    },
    {
      provide: AbstractTextInputComponent,
      useExisting: TestComponent,
    },
  ],
})
class TestComponent extends AbstractTextInputComponent {}

@Component({
  selector: 'test-wrapper',
  template: `<test-component></test-component>`,
})
class TestWrapperComponent {
  @ViewChild(TestComponent) public readonly componentRef!: TestComponent;
}

describe(`AbstractTextInputComponent`, () => {
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TestWrapperComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();

    component = fixture.componentInstance.componentRef;
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`onKeyDown`, () => {
    it(`should stop propagation of the event`, () => {
      const event = new KeyboardEvent('keydown');

      jest.spyOn(event, 'stopPropagation');

      component.onKeyDown(event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it(`should emit the keydown event`, () => {
      const event = new KeyboardEvent('keydown');
      const spy = jest.spyOn(component.keydown, 'emit');

      component.onKeyDown(event);

      expect(spy).toHaveBeenCalledWith(event);
    });
  });
});
