import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { convertTimeUnit, TimeUnit } from '@qntm-code/utils';
import { combineLatest, filter, interval, map, shareReplay, skip } from 'rxjs';
import { AuthActions, selectAuthErrorCode, selectAuthorizing, selectResendEmailTime } from '../../../auth';
import { AppAbstractComponent } from '../abstracts';

@Component({
  selector: 'send-partners-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailVerificationComponent extends AppAbstractComponent {
  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

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

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);

    this.store
      .select(selectAuthorizing)
      .pipe(
        filter(authorizing => !authorizing),
        skip(1)
      )
      .subscribe(() => this.form.enable());
  }

  public submit(): void {
    if (this.form.valid) {
      this.store.dispatch(AuthActions.verifyEmail({ code: this.code.value }));
    }
  }

  public resend(): void {
    this.store.dispatch(AuthActions.resendEmailVerification());
  }
}
