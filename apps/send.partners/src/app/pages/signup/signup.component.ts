import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProfile } from '../../auth';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'send-partners-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent extends AppAbstractComponent {
  public readonly profile$ = this.store.select(selectProfile);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }
}
