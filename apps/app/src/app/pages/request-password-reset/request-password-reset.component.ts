import { Component, ViewEncapsulation } from '@angular/core';
import { RequestPasswordResetCredentials } from '@common';
import { AuthActions } from '../../auth';
import { AppAbstractAuthPageComponent } from '../../common';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestPasswordResetComponent extends AppAbstractAuthPageComponent {
  public requestPasswordReset(resetPassword: RequestPasswordResetCredentials): void {
    this.store.dispatch(AuthActions.requestPasswordReset(resetPassword));
  }
}
