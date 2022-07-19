import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { passwordRegex, ResetPasswordCredentials } from '@common';
import { didChange } from '../../helpers';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'common-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PasswordResetComponent extends AbstractComponent implements OnChanges {
  /**
   * An event emitter for the reset password details
   */
  @Output() public readonly resetPassword = new EventEmitter<ResetPasswordCredentials>();

  /**
   * Error message to display
   */
  @Input() public error?: string | null;

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

  public ngOnChanges(changes: SimpleChanges): void {
    if (didChange(changes['error'])) {
      this.form.enable();
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.resetPassword.emit({ ...this.form.value, code: this.code });
    }
  }
}
