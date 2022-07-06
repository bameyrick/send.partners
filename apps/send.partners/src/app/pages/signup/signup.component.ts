import { Component, ViewEncapsulation } from '@angular/core';
import { AppPath } from '../../routing';
import { AbstractSignupStepComponent } from './signup.abstract.component';

@Component({
  selector: 'send-partners-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent extends AbstractSignupStepComponent {
  protected readonly path = AppPath.Signup;
}
