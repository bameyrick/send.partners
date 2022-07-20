import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../auth';
import { TranslateService } from '../../../../translate';
import { AbstractAuthFormComponent } from '../../../../forms/abstracts';

@Component({
  selector: 'common-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
})
export class RequestPasswordResetComponent extends AbstractAuthFormComponent {
  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: new FormControl(this.activatedRoute.snapshot.queryParams['email']),
  });

  constructor(
    elementRef: ElementRef,
    store: Store,
    translateService: TranslateService,
    router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super(elementRef, store, translateService, router);
  }

  protected dispatch(): void {
    this.store.dispatch(AuthActions.requestPasswordReset({ ...this.form.value }));
  }
}
