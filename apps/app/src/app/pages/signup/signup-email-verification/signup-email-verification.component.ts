import { Component, ViewEncapsulation } from '@angular/core';
import { AppPath } from '@common';
import { AbstractSignupStepComponent } from '../signup.abstract.component';

@Component({
  selector: 'app-signup-email-verification',
  templateUrl: './signup-email-verification.component.html',
  styleUrls: ['./signup-email-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupEmailVerificationComponent extends AbstractSignupStepComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'SignUpVerify';

  protected readonly path = AppPath.SignupVerify;
}
