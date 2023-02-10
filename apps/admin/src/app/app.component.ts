import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { AppPath } from '@common';
import { AbstractComponent, AuthActions, AuthGuard, Icon, NavigationGroup, selectAuthenticated } from '@common-ui';
import { Store } from '@ngrx/store';
import { asyncFilter } from '@qntm-code/utils';
import { concatMap, filter, Observable } from 'rxjs';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'App';

  /**
   * Whether the current user is authenticated
   */
  public readonly authenticated$ = this.store.select(selectAuthenticated);

  /**
   * Links to show in the navigation bar
   */
  public readonly navLinks$: Observable<NavigationGroup[]> = this.authenticated$.pipe(
    filter(authenticated => !!authenticated),
    concatMap(
      async () =>
        await asyncFilter(
          [
            {
              items: [
                {
                  url: AppPath.Root,
                  translationKey: 'admin.dashboard',
                  icon: Icon.TableLayout,
                },
              ],
            },
            {
              items: [
                {
                  url: AppPath.Users,
                  translationKey: 'admin.users',
                  icon: Icon.Users,
                },
              ],
            },
            {
              items: [
                {
                  url: AppPath.Groups,
                  translationKey: 'groups.groups',
                  icon: Icon.Group,
                },
              ],
            },
            {
              items: [
                {
                  url: AppPath.ActivityConfigs,
                  translationKey: 'admin.activity_configs',
                  icon: Icon.SettingsSliders,
                },
              ],
            },
          ] as NavigationGroup[],
          async group => !group.url || (await this.authGuard.hasAuthorityForRoute(group.url))
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
