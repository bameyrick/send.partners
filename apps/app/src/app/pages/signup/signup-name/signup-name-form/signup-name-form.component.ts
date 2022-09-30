import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AbstractAuthFormComponent } from '@common-ui';
import { SignupActions } from '../../store';

@Component({
  selector: 'app-signup-name-form',
  templateUrl: './signup-name-form.component.html',
  styleUrls: ['./signup-name-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupNameFormComponent extends AbstractAuthFormComponent {
  /**
   * The form controls
   */
  public readonly form = new UntypedFormGroup({
    name: new UntypedFormControl(),
  });

  protected dispatch(): void {
    this.store.dispatch(SignupActions.setName(this.form.value));
  }
}
