import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@common-ui';
import { AuthActions, selectAuthErrorCode } from '../../../../auth';
import { AppAbstractComponent } from '../abstract-component';

@Directive()
export abstract class AppAbstractAuthPageComponent extends AppAbstractComponent implements OnDestroy {
  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

  constructor(
    elementRef: ElementRef,
    protected readonly store: Store,
    protected readonly translateService: TranslateService,
    protected readonly router: Router
  ) {
    super(elementRef);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.store.dispatch(AuthActions.resetAuthError());
  }
}
