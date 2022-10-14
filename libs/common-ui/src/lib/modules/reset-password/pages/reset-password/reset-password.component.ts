import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordRegex, ResetPasswordCredentials } from '@common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../auth';
import { TranslateService } from '../../../../translate';
import { AbstractAuthFormComponent } from '../../../../forms/abstracts';

@Component({
  selector: 'common-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent extends AbstractAuthFormComponent {
  /**
   * Expose the password regex to the view
   */
  public readonly passwordRegex = passwordRegex;

  /**
   * The password form control
   */
  public readonly password = new FormControl<string | null | undefined>(undefined);

  /**
   * The form controls
   */
  public readonly form = new FormGroup({
    password: this.password,
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
    this.store.dispatch(
      AuthActions.resetPassword({
        credentials: { ...this.form.value, code: this.activatedRoute.snapshot.params['code'] } as ResetPasswordCredentials,
      })
    );
  }
}
