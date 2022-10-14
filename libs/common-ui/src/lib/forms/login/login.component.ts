import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginCredentials } from '@common';
import { AuthActions } from '../../auth';
import { AbstractAuthFormComponent } from '../abstracts';

@Component({
  selector: 'common-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends AbstractAuthFormComponent {
  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: new FormControl<string | undefined>(undefined),
    password: new FormControl<string | undefined>(undefined),
  });

  protected dispatch(): void {
    this.store.dispatch(AuthActions.login({ credentials: this.form.value as LoginCredentials }));
  }
}
