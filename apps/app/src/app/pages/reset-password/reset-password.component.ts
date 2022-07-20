import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AppAbstractComponent } from '../../common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent extends AppAbstractComponent {
  /**
   * The password reset code
   */
  public readonly code$ = this.activatedRoute.params.pipe(map(params => params['code']));

  constructor(
    elementRef: ElementRef,

    private readonly activatedRoute: ActivatedRoute
  ) {
    super(elementRef);
  }
}
