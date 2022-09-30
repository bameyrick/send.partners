import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
  public readonly form = new UntypedFormGroup({
    email: new UntypedFormControl(),
    password: new UntypedFormControl(),
  });

  protected dispatch(): void {
    this.store.dispatch(AuthActions.login({ credentials: this.form.value }));
  }
}
