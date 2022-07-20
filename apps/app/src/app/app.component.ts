import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthenticated } from '@common-ui';
import { AppAbstractComponent } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AppAbstractComponent {
  /**
   * Whether to show login or signup
   */
  public readonly authenticated$ = this.store.select(selectAuthenticated);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
