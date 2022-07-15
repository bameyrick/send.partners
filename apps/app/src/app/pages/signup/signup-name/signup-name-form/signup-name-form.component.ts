import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractAuthFormComponent } from '../../../../common';
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
  public readonly form = new FormGroup({
    name: new FormControl(),
  });

  protected dispatch(): void {
    this.store.dispatch(SignupActions.setName(this.form.value));
  }
}
