import { Component, ViewEncapsulation } from '@angular/core';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestPasswordResetComponent extends AppAbstractComponent {}
