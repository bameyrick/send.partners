import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AbstractComponent } from '../../../../components';

@Component({
  selector: 'common-request-password-reset-success',
  templateUrl: './request-password-reset-success.component.html',
  styleUrls: ['./request-password-reset-success.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestPasswordResetSuccessComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'RequestPasswordResetSuccess';

  public readonly email$ = this.activatedRoute.queryParams.pipe(map(params => params['email']));

  constructor(elementRef: ElementRef, private readonly activatedRoute: ActivatedRoute) {
    super(elementRef);
  }
}
