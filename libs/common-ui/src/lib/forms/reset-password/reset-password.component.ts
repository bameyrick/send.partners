import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { passwordRegex } from '@common';
import { AuthActions } from '../../auth';
import { AbstractAuthFormComponent } from '../abstracts';

@Component({
  selector: 'common-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent extends AbstractAuthFormComponent {
  /**
   * The password reset code
   */
  @Input() public code?: string;

  /**
   * Link to the request password reset page
   */
  @Input() public requestPasswordResetLink?: string;

  /**
   * Expose the password regex to the view
   */
  public readonly passwordRegex = passwordRegex;

  /**
   * The password form control
   */
  public readonly password = new FormControl();

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    password: this.password,
  });

  protected dispatch(): void {
    this.store.dispatch(AuthActions.resetPassword({ credentials: { ...this.form.value, code: this.code } }));
  }
}
