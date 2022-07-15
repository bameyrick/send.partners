import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth';
import { AppAbstractComponent } from './common';

@Component({
  selector: 'send-partners-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends AppAbstractComponent {
  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
