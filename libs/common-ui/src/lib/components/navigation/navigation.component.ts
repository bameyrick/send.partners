import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthUser } from '../../auth';
import { AbstractComponent } from '../abstracts';
import { NavigationGroup } from './navigation.models';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Navigation';

  /**
   * The navigation groups
   */
  @Input() public navigationGroups?: NavigationGroup[];

  /**
   * The current logged in user
   */
  public readonly currentUser$ = this.store.select(selectAuthUser);

  /**
   * Whether the menu is open
   */
  @HostBinding('class.Navigation--open') public menuOpen = false;

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
