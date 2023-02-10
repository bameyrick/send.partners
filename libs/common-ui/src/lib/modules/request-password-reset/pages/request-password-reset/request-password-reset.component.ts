import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestPasswordResetCredentials } from '@common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../auth';
import { AbstractAuthFormComponent } from '../../../../forms/abstracts';
import { TranslateService } from '../../../../translate';

@Component({
  selector: 'common-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestPasswordResetComponent extends AbstractAuthFormComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'RequestPasswordReset';

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    email: new FormControl<string>(this.activatedRoute.snapshot.queryParams['email']),
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
    this.store.dispatch(AuthActions.requestPasswordReset(this.form.value as RequestPasswordResetCredentials));
  }
}
