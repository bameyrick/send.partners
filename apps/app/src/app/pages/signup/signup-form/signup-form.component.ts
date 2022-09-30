import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AppPath, getRouterLinkForAppPath, passwordRegex } from '@common';
import { AbstractAuthFormComponent, AuthActions, matchesValidator } from '@common-ui';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup-form',
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
  public readonly email = new UntypedFormControl();

  /**
   * Password form control
   */
  public readonly password = new UntypedFormControl();

  /**
   * Confirm password form control
   */
  public readonly confirmPassword = new UntypedFormControl();

  /**
   * The form controls
   */
  public readonly form = new UntypedFormGroup({
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  public readonly loginLink = getRouterLinkForAppPath(AppPath.Login);

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
