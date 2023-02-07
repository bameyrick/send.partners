import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { AppPath } from '@common';
import { AbstractComponent, AuthActions, AuthGuard, selectAuthenticated } from '@common-ui';
import { Store } from '@ngrx/store';
import { asyncFilter } from '@qntm-code/utils';
import { concatMap, filter } from 'rxjs';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AbstractComponent {
  /**
   * Whether the current user is authenticated
   */
  public readonly authenticated$ = this.store.select(selectAuthenticated);

  /**
   * Links to show in the navigation bar
   */
  public readonly navLinks$ = this.authenticated$.pipe(
    filter(authenticated => !!authenticated),
    concatMap(
      async () =>
        await asyncFilter(
          [
            {
              path: AppPath.Root,
              translationKey: 'admin.dashboard',
            },
            {
              path: AppPath.Users,
              translationKey: 'admin.users',
            },
          ],
          async link => await this.authGuard.hasAuthorityForRoute(link.path)
        )
    )
  );

  constructor(elementRef: ElementRef, private readonly store: Store, private readonly authGuard: AuthGuard) {
    super(elementRef);
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
