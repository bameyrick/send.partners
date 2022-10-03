import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthActions } from '../../../../auth';
import { CommonUiTestingModule } from '../../../../common-ui-testing.module';

import { RequestPasswordResetComponent } from './request-password-reset.component';

describe('RequestPasswordResetComponent', () => {
  let component: RequestPasswordResetComponent;
  let fixture: ComponentFixture<RequestPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [RequestPasswordResetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`dispatch`, () => {
    it(`should dispatch the requestPasswordReset action`, () => {
      const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');
      component.form.setValue({ email: '' });

      (component as any).dispatch();

      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.requestPasswordReset({ email: '' }));
    });
  });
});
