import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { convertTimeUnit, TimeUnit } from '@qntm-code/utils';
import { combineLatest, interval, map, shareReplay } from 'rxjs';
import { AuthActions, selectResendEmailTime } from '../../auth';
import { AbstractAuthFormComponent } from '../abstracts';

@Component({
  selector: 'common-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailVerificationComponent extends AbstractAuthFormComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'EmailVerification';

  public readonly resendTime$ = combineLatest([this.store.select(selectResendEmailTime), interval(1000)]).pipe(
    map(([time]) => {
      if (time) {
        const remainingTime = time.getTime() - new Date().getTime();

        const minutes = Math.max(0, Math.floor(convertTimeUnit(remainingTime, TimeUnit.Milliseconds, TimeUnit.Minutes)));

        const seconds = Math.max(
          0,
          Math.floor(
            convertTimeUnit(
              remainingTime - convertTimeUnit(minutes, TimeUnit.Minutes, TimeUnit.Milliseconds),
              TimeUnit.Milliseconds,
              TimeUnit.Seconds
            )
          )
        );

        return {
          minutes,
          seconds,
        };
      }

      return undefined;
    }),
    shareReplay(1)
  );

  public readonly canResend$ = this.resendTime$.pipe(
    map(time => !time || (time.minutes === 0 && time.seconds === 0)),
    shareReplay(1)
  );

  /**
   * Code form control
   */
  public readonly code = new FormControl<string | null | undefined>(undefined);

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    code: this.code,
  });

  public resend(): void {
    this.store.dispatch(AuthActions.resendEmailVerification());
  }

  protected dispatch(): void {
    this.store.dispatch(AuthActions.verifyEmail(this.form.value as { code: string }));
  }
}
