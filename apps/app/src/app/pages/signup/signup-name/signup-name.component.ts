import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AppPath } from '@common';
import { AbstractSignupStepComponent } from '../signup.abstract.component';

@Component({
  selector: 'app-signup-name',
  templateUrl: './signup-name.component.html',
  styleUrls: ['./signup-name.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupNameComponent extends AbstractSignupStepComponent implements OnDestroy {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'SignUpName';

  protected readonly path = AppPath.SignupName;
}
