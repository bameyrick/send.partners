import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordCredentials } from '@common';
import { TranslateService } from '@common-ui';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthActions } from '../../auth';
import { AppAbstractAuthPageComponent } from '../../common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent extends AppAbstractAuthPageComponent {
  /**
   * The password reset code
   */
  public readonly code$ = this.activatedRoute.params.pipe(map(params => params['code']));

  constructor(
    elementRef: ElementRef,
    store: Store,
    translateService: TranslateService,
    router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super(elementRef, store, translateService, router);
  }

  public resetPassword(credentials: ResetPasswordCredentials): void {
    this.store.dispatch(AuthActions.resetPassword({ credentials }));
  }
}
