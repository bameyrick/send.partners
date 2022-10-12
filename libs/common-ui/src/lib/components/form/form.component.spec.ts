import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { delay } from '@qntm-code/utils';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`on submit`, () => {
    let setHostClassSpy: jest.SpyInstance;

    beforeEach(() => {
      setHostClassSpy = jest.spyOn(component as any, 'setHostClass');

      (component as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));
    });

    it(`should set submitted to true`, () => {
      expect(component.submitted).toBe(true);
    });

    it(`should call setHostClass`, () => {
      expect(setHostClassSpy).toHaveBeenCalled();
    });

    describe(`getHostClasses`, () => {
      it(`should add a Form--submitted class`, () => {
        expect((component as any).getHostClasses()).toContain('Form--submitted');
      });
    });

    describe(`when the form is valid`, () => {
      let formGroup: FormGroup;

      beforeEach(async () => {
        formGroup = new FormGroup({});

        component.formGroup = formGroup;

        (component as any).elementRef.nativeElement.dispatchEvent(new Event('submit'));

        await delay();
      });

      it(`should disable the form`, () => {
        expect(formGroup.disabled).toBe(true);
      });
    });
  });
});
