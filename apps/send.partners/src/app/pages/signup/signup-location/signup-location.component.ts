import { Component, ViewEncapsulation } from '@angular/core';
import { AppPath } from '../../../routing';
import { AbstractSignupStepComponent } from '../signup.abstract.component';

@Component({
  selector: 'send-partners-signup-location',
  templateUrl: './signup-location.component.html',
  styleUrls: ['./signup-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupLocationComponent extends AbstractSignupStepComponent {
  protected readonly path = AppPath.SignupLocation;
}
