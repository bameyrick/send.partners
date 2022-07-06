import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { passwordRegex } from '@send.partners/common';
import { matchesValidator } from '@send.partners/send-partners-common-ui';
import { firstValueFrom } from 'rxjs';
import { AuthActions } from '../../../auth';
import { AbstractAuthFormComponent } from '../../../common';
import { AppPath } from '../../../routing';

@Component({
  selector: 'send-partners-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupFormComponent extends AbstractAuthFormComponent implements OnInit, OnDestroy {
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

  protected readonly path = AppPath.Signup;

  public override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.password.setValidators(matchesValidator(this.confirmPassword, this.confirmPasswordId));
    this.confirmPassword.setValidators(matchesValidator(this.password, this.passwordId));
  }

  protected async dispatch(): Promise<void> {
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
