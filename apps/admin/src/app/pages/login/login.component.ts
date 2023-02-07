import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '@common-ui';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends AbstractComponent {}
