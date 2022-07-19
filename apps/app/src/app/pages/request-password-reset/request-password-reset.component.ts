import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { RequestPasswordResetCredentials } from '@common';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthErrorCode } from '../../auth';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestPasswordResetComponent extends AppAbstractComponent {
  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public requestPasswordReset(resetPassword: RequestPasswordResetCredentials): void {
    this.store.dispatch(AuthActions.requestPasswordReset(resetPassword));
  }
}
