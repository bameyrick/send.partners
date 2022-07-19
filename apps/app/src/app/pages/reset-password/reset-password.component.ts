import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordCredentials } from '@common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthActions, selectAuthErrorCode } from '../../auth';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent extends AppAbstractComponent {
  /**
   * The password reset code
   */
  public readonly code$ = this.activatedRoute.params.pipe(map(params => params['code']));

  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

  constructor(elementRef: ElementRef, private readonly store: Store, private readonly activatedRoute: ActivatedRoute) {
    super(elementRef);
  }

  public resetPassword(credentials: ResetPasswordCredentials): void {
    this.store.dispatch(AuthActions.resetPassword({ credentials }));
  }
}
