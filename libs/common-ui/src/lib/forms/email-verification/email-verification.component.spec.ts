import { ComponentFixture, TestBed } from '@angular/core/testing';
import { delay } from '@qntm-code/utils';
import { firstValueFrom } from 'rxjs';
import { AuthActions } from '../../auth';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { EmailVerificationComponent } from './email-verification.component';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      declarations: [EmailVerificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`resendSeconds$`, () => {
    it(`should count down the time in seconds`, async () => {
      const retryEnables = new Date();

      retryEnables.setSeconds(retryEnables.getSeconds() + 2);

      (component as any).store.dispatch(AuthActions.resendEmailVerificationSuccess({ retryEnables }));

      for (let i = 2; i >= 0; i--) {
        expect(await firstValueFrom(component.resendSeconds$)).toBe(i);

        await delay(1001);
      }
    });
  });

  describe(`resend`, () => {
    it(`should dispatch resendEmailVerification`, () => {
      const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');

      component.resend();

      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.resendEmailVerification());
    });
  });

  describe(`dispatch`, () => {
    it(`should dispatch verifyEmail with the value of the code field`, () => {
      const dispatchSpy = jest.spyOn((component as any).store, 'dispatch');

      component.code.setValue('test');

      (component as any).dispatch();

      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.verifyEmail({ code: 'test' }));
    });
  });
});
