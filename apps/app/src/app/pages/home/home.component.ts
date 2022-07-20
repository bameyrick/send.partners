import { Component, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthenticated } from '@common-ui';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends AppAbstractComponent implements OnDestroy {
  /**
   * Whether to show login or signup
   */
  public readonly authenticated$ = this.store.select(selectAuthenticated);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }
}
