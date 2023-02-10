import { Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractComponent, selectAuthenticated } from '@common-ui';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends AbstractComponent implements OnDestroy {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Home';

  /**
   * Whether to show login or signup
   */
  public readonly authenticated$ = this.store.select(selectAuthenticated);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }
}
