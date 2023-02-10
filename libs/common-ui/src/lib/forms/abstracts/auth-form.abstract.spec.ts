import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { AuthActions } from '../../auth';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AbstractAuthFormComponent } from './auth-form.abstract';

@Component({
  selector: 'test-component',
  template: ``,
})
class TestComponent extends AbstractAuthFormComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Test';

  public readonly control = new FormControl();

  public readonly form = new FormGroup({ control: this.control });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected dispatch(): void {}
}

describe(`AbstractAuthFormComponent`, () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`when authorization finishes`, () => {
    it(`should renable the form`, () => {
      component.form.disable();
      (component as any).store.dispatch(AuthActions.login({ credentials: createMock<LoginCredentials>() }));

      (component as any).store.dispatch(AuthActions.loginSuccess({ user: createMock<User>() }));

      expect(component.form.enabled).toBe(true);
    });
  });

  describe(`on submit`, () => {
    it(`should not call dispatch if the form is not valid`, () => {
      component.control.setValidators(Validators.required);
      component.control.updateValueAndValidity();

      const dispatchSpy = jest.spyOn(component as any, 'dispatch');

      component.submit();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it(`should call dispatch if the form is valid`, () => {
      const dispatchSpy = jest.spyOn(component as any, 'dispatch');

      component.submit();

      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
