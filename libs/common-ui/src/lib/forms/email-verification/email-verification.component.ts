import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { convertTimeUnit, TimeUnit } from '@qntm-code/utils';
import { combineLatest, interval, map, shareReplay } from 'rxjs';
import { selectResendEmailTime, AuthActions } from '../../auth';
import { AbstractAuthFormComponent } from '../abstracts';

@Component({
  selector: 'common-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailVerificationComponent extends AbstractAuthFormComponent {
  public readonly resendSeconds$ = combineLatest([this.store.select(selectResendEmailTime), interval(1000)]).pipe(
    map(([time]) =>
      time
        ? Math.max(0, Math.ceil(convertTimeUnit(time.getTime() - new Date().getTime(), TimeUnit.Milliseconds, TimeUnit.Seconds)))
        : undefined
    ),
    shareReplay(1)
  );

  public readonly canResend$ = this.resendSeconds$.pipe(
    map(seconds => !seconds || seconds === 0),
    shareReplay(1)
  );

  /**
   * Code form control
   */
  public readonly code = new FormControl();

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
    this.store.dispatch(AuthActions.verifyEmail({ code: this.code.value }));
  }
}
