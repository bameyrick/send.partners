import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginCredentials } from '@send.partners/common';
import { map } from 'rxjs';
import { AuthActions, selectAuthTokens } from '../../auth';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'send-partners-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends AppAbstractComponent {
  /**
   * Whether to show login or signup
   */
  public readonly authenticated$ = this.store.select(selectAuthTokens).pipe(map(tokens => !!tokens));

  public signingUp = false;

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public login(credentials: LoginCredentials): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }
}
