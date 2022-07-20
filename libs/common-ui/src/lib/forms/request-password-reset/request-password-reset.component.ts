import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthActions } from '../../auth';
import { AbstractAuthFormComponent } from '../abstracts';

@Component({
  selector: 'common-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
})
export class RequestPasswordResetComponent extends AbstractAuthFormComponent {
  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: new FormControl(),
  });

  protected dispatch(): void {
    this.store.dispatch(AuthActions.requestPasswordReset({ ...this.form.value }));
  }
}
