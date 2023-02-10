import { Component, ViewEncapsulation } from '@angular/core';
import { AppPath } from '@common';
import { AbstractSignupStepComponent } from './signup.abstract.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent extends AbstractSignupStepComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'SigUup';

  protected readonly path = AppPath.Signup;
}
