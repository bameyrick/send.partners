import { Component, ViewEncapsulation } from '@angular/core';
import { AppPath } from '@common';
import { AbstractSignupStepComponent } from '../signup.abstract.component';

@Component({
  selector: 'app-signup-location',
  templateUrl: './signup-location.component.html',
  styleUrls: ['./signup-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupLocationComponent extends AbstractSignupStepComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'SignUpLocation';

  protected readonly path = AppPath.SignupLocation;
}
