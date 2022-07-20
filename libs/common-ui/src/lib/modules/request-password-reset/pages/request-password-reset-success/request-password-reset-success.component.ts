import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractComponent } from '../../../../components';
import { map } from 'rxjs';

@Component({
  selector: 'common-request-password-reset-success',
  templateUrl: './request-password-reset-success.component.html',
  styleUrls: ['./request-password-reset-success.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestPasswordResetSuccessComponent extends AbstractComponent {
  public readonly email$ = this.activatedRoute.queryParams.pipe(map(params => params['email']));

  constructor(elementRef: ElementRef, private readonly activatedRoute: ActivatedRoute) {
    super(elementRef);
  }
}
