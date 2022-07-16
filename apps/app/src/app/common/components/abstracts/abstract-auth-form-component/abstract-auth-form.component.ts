import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@common-ui';
import { AuthActions, selectAuthErrorCode, selectAuthorizing } from '../../../../auth';
import { filter, skip } from 'rxjs';
import { AppAbstractComponent } from '../abstract-component';

@Directive()
export abstract class AbstractAuthFormComponent extends AppAbstractComponent implements OnDestroy {
  /**
   * The form controls
   */
  public abstract readonly form: FormGroup;

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

    this.store
      .select(selectAuthorizing)
      .pipe(
        filter(authorizing => !authorizing),
        skip(1)
      )
      .subscribe(() => this.form.enable());
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.store.dispatch(AuthActions.resetAuthError());
  }

  public submit(): void {
    if (this.form.valid) {
      this.dispatch();
    }
  }

  protected abstract dispatch(): void;
}
