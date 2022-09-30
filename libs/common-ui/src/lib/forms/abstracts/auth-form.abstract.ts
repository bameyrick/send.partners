import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, skip } from 'rxjs';
import { AuthActions, selectAuthErrorCode, selectAuthorizing } from '../../auth';
import { AbstractComponent } from '../../components';
import { TranslateService } from '../../translate';

@Directive()
export abstract class AbstractAuthFormComponent extends AbstractComponent implements OnDestroy {
  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

  /**
   * The form controls
   */
  public abstract readonly form: UntypedFormGroup;

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
