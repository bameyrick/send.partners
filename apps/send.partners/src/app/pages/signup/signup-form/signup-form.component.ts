import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { passwordRegex } from '@send.partners/common';
import { matchesValidator, TranslateService } from '@send.partners/send-partners-common-ui';
import { filter, firstValueFrom, skip } from 'rxjs';
import { AuthActions, selectAuthErrorCode, selectAuthorizing } from '../../../auth';
import { AppAbstractComponent } from '../../../common';

@Component({
  selector: 'send-partners-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupFormComponent extends AppAbstractComponent implements OnInit {
  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

  /**
   * Id for the password control
   */
  public readonly passwordId = 'new-password';

  /**
   * Id for the confirm password control
   */
  public readonly confirmPasswordId = 'confirm-password';

  /**
   * Expose the password regex to the view
   */
  public readonly passwordRegex = passwordRegex;

  /**
   * Email form control
   */
  public readonly email = new FormControl();

  /**
   * Password form control
   */
  public readonly password = new FormControl();

  /**
   * Confirm password form control
   */
  public readonly confirmPassword = new FormControl();

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  constructor(elementRef: ElementRef, private readonly store: Store, private readonly translateService: TranslateService) {
    super(elementRef);

    this.store
      .select(selectAuthorizing)
      .pipe(
        filter(authorizing => !authorizing),
        skip(1)
      )
      .subscribe(() => this.form.enable());
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.password.setValidators(matchesValidator(this.confirmPassword, this.confirmPasswordId));
    this.confirmPassword.setValidators(matchesValidator(this.password, this.passwordId));
  }

  public async submit(): Promise<void> {
    if (this.form.valid) {
      this.store.dispatch(
        AuthActions.signUp({
          credentials: {
            email: this.email.value,
            password: this.password.value,
            language: await firstValueFrom(this.translateService.language$),
          },
        })
      );
    }
  }
}
