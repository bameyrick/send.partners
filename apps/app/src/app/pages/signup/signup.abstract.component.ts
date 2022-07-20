import { Directive, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppPath, getRouterLinkForAppPath } from '@common';
import { AbstractComponent } from '@common-ui';
import { filter, firstValueFrom } from 'rxjs';
import { signupOrder } from './signup-order';
import { signupRules } from './signup-rules';

@Directive()
export abstract class AbstractSignupStepComponent extends AbstractComponent implements OnInit {
  protected abstract readonly path: AppPath;

  constructor(elementRef: ElementRef, private readonly store: Store, private readonly router: Router) {
    super(elementRef);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.listenForNextStep();
  }

  private async listenForNextStep(): Promise<void> {
    await firstValueFrom(signupRules[this.path](this.store).pipe(filter(result => !!result)));

    const nextPath = signupOrder[signupOrder.indexOf(this.path) + 1];

    if (nextPath) {
      this.router.navigateByUrl(getRouterLinkForAppPath(nextPath));
    } else {
      this.router.navigateByUrl(getRouterLinkForAppPath(AppPath.Root));
    }
  }
}
