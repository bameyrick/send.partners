import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'send-partners-common-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends AbstractComponent {
  public readonly form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  public login(event: Event): void {
    console.log(event);
  }
}
