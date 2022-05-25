import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAuthTokens } from '../../auth';
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
  public showLogin$ = this.store.select(selectAuthTokens).pipe(map(tokens => !!tokens));

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }
}
