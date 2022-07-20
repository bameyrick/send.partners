import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../../../../components';

@Component({
  selector: 'common-reset-password-success',
  templateUrl: './reset-password-success.component.html',
  styleUrls: ['./reset-password-success.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordSuccessComponent extends AbstractComponent {}
