import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginCredentials } from '@send.partners/common';
import { LoginComponent } from '@send.partners/send-partners-common-ui';
import { filter, map, skip } from 'rxjs';
import { AuthActions, selectAuthErrorCode, selectAuthorizing, selectAuthTokens } from '../../auth';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'send-partners-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends AppAbstractComponent implements OnDestroy {
  /**
   * Whether to show login or signup
   */
  public readonly authenticated$ = this.store.select(selectAuthTokens).pipe(map(tokens => !!tokens));

  /**
   * Error message to display
   */
  public readonly error$ = this.store.select(selectAuthErrorCode);

  @ViewChild(LoginComponent) private readonly loginComponent?: LoginComponent;

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);

    this.store
      .select(selectAuthorizing)
      .pipe(
        filter(authorizing => !authorizing),
        skip(1)
      )
      .subscribe(() => this.loginComponent?.form.enable());
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.store.dispatch(AuthActions.resetAuthError());
  }

  public login(credentials: LoginCredentials): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }
}
