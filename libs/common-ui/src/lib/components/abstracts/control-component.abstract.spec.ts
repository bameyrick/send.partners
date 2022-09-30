import { Component, forwardRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { delay } from '@qntm-code/utils';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { FormComponent } from '../form';
import { AbstractControlComponent } from './control-component.abstract';

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
      provide: AbstractControlComponent,
      useExisting: TestComponent,
    },
  ],
})
class TestComponent extends AbstractControlComponent<unknown> {}

@Component({
  selector: 'test-wrapper',
  template: `<form>
    <test-component [formControl]="control"></test-component>
  </form>`,
})
class TestWrapperComponent {
  @ViewChild(TestComponent) public readonly componentRef!: TestComponent;

  @ViewChild(FormComponent) public readonly formRef!: FormComponent;

  public readonly control = new FormControl();
}

describe(`AbstractControlComponent`, () => {
  let component: TestComponent;
  let wrapper: TestWrapperComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent, TestWrapperComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestWrapperComponent);
    wrapper = fixture.componentInstance;
    fixture.detectChanges();

    component = fixture.componentInstance.componentRef;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`ngAfterContentInit`, () => {
    it(`should set contentInitialised to true`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).contentInitialised).toBe(true);
    });
  });

  describe(`on form submit`, () => {
    it(`should set submitted to true`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (wrapper.formRef as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));

      expect(component.submitted).toBe(true);
    });

    it(`should set errorsSnapshot to null`, () => {
      expect(component.errorsSnapshot).toBeUndefined();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (wrapper.formRef as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));

      expect(component.errorsSnapshot).toBeNull();
    });

    describe(`when the control is invalid`, () => {
      it(`should set errorsSnapshot to the control errors`, async () => {
        expect(component.errorsSnapshot).toBeUndefined();

        wrapper.control.setValidators(Validators.required);
        wrapper.control.updateValueAndValidity();

        await delay();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (wrapper.formRef as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));

        expect(component.errorsSnapshot).toEqual([{ translationArgs: { required: true }, translationKey: 'common.validation.required' }]);
      });

      it(`should clear the errorsSnapshot`, async () => {
        wrapper.control.setValidators(Validators.required);
        wrapper.control.updateValueAndValidity();

        await delay();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (wrapper.formRef as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));

        expect(component.errorsSnapshot).toEqual([{ translationArgs: { required: true }, translationKey: 'common.validation.required' }]);

        wrapper.control.removeValidators(Validators.required);
        wrapper.control.updateValueAndValidity();

        await delay();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (wrapper.formRef as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));

        expect(component.errorsSnapshot).toBeNull();
      });
    });
  });

  describe(`onChange`, () => {
    it(`should call _onChange with the provided value`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(component as any, '_onChange');

      component.onChange('test');

      expect(spy).toHaveBeenCalledWith('test');
    });

    it(`should call next on setStateQueue$`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn((component as any).setStateQueue$, 'next');

      component.onChange('test');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe(`onTouched`, () => {
    it(`should call _onTouched`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(component as any, '_onTouched');

      component.onTouched();

      expect(spy).toHaveBeenCalled();
    });

    it(`should call next on setStateQueue$`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn((component as any).setStateQueue$, 'next');

      component.onTouched();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe(`onFocus`, () => {
    it(`if the form is disabled then focused property should remain as false`, () => {
      component.disabled = true;

      component.onFocus(new FocusEvent('focus'));

      expect(component.focused).toBe(false);
    });

    it(`if the form is readonly then focused property should remain as false`, () => {
      component.readonly = true;

      component.onFocus(new FocusEvent('focus'));

      expect(component.focused).toBe(false);
    });

    it(`should set the focused property to true`, () => {
      component.onFocus(new FocusEvent('focus'));

      expect(component.focused).toBe(true);
    });

    it(`should call next on setStateQueue$`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn((component as any).setStateQueue$, 'next');

      component.onFocus(new FocusEvent('focus'));

      expect(spy).toHaveBeenCalled();
    });

    it(`should emit a focus event`, () => {
      const spy = jest.spyOn(component.focus, 'emit');

      component.onFocus(new FocusEvent('focus'));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe(`onBlur`, () => {
    it(`should set the focused property to false`, () => {
      component.focused = true;

      component.onBlur(new FocusEvent('blur'));

      expect(component.focused).toBe(false);
    });

    it(`should call next on setStateQueue$`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn((component as any).setStateQueue$, 'next');

      component.onBlur(new FocusEvent('blur'));

      expect(spy).toHaveBeenCalled();
    });

    it(`should emit a blur event`, () => {
      const spy = jest.spyOn(component.blur, 'emit');

      component.onBlur(new FocusEvent('blur'));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe(`setValue`, () => {
    it(`should set the value property to the provided value`, () => {
      component.setValue('test');

      expect(component.value).toBe('test');
    });

    it(`should set valueChanged to true if the provided value does not match the initial value`, () => {
      component.setValue('test');

      expect(component.valueChanged).toBe(true);
    });

    it(`should set valueChanged to false if the provided value matches the initial value`, () => {
      component.setValue(null);

      expect(component.valueChanged).toBe(false);
    });

    it(`should set valueChanged to false if the provided value matches the initial value (array)`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (component as any).initialValue = ['a', 'b', 'c'];
      component.setValue(['a', 'b', 'c']);

      expect(component.valueChanged).toBe(false);
    });

    it(`should call onTouched`, () => {
      const spy = jest.spyOn(component, 'onTouched');

      component.setValue(null);

      expect(spy).toHaveBeenCalled();
    });

    it(`should call onChange with the updated value`, () => {
      const spy = jest.spyOn(component, 'onChange');

      component.setValue(null);

      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe(`getHostClasses`, () => {
    it(`should add the Field--disabled class if the field is disabled`, () => {
      component.disabled = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).getHostClasses()).toEqual(expect.arrayContaining([`Field--disabled`]));
    });

    it(`shouldn't add the Field--disabled class if the field isn't disabled`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).getHostClasses()).toEqual(expect.not.arrayContaining([`Field--disabled`]));
    });

    it(`should add the Field--readonly class if the field is readonly`, () => {
      component.readonly = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).getHostClasses()).toEqual(expect.arrayContaining([`Field--readonly`]));
    });

    it(`shouldn't add the Field--readonly class if the field isn't readonly`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).getHostClasses()).toEqual(expect.not.arrayContaining([`Field--readonly`]));
    });
  });

  describe(`getInputClasses`, () => {
    it(`should add any provided input classes`, () => {
      component.inputClass = 'test';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).getInputClasses()).toEqual(expect.objectContaining({ test: true }));
    });
  });
});
